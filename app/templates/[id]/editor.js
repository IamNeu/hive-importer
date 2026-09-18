'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Field({ value, onSave, className }) {
  const [v, setV] = useState(value ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const dirty = v !== (value ?? '')

  async function save() {
    setSaving(true)
    await onSave(v)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <span className="inline-flex items-center gap-2 w-full">
      <input value={v} onChange={e => setV(e.target.value)}
        className={className + ' border rounded px-2 py-1 flex-1'} />
      {dirty && (
        <button onClick={save} disabled={saving}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
          {saving ? 'Saving...' : 'Save'}
        </button>
      )}
      {saved && <span className="text-xs text-green-700">Saved</span>}
    </span>
  )
}

export default function TemplateEditor({ template, tree, counts, issues }) {
  const [open, setOpen] = useState({})
  const [copying, setCopying] = useState(false)
  const router = useRouter()

  async function patch(table, id, field, value) {
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, field, value }),
    })
    router.refresh()
  }

  async function duplicate() {
    setCopying(true)
    const res = await fetch('/api/duplicate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId: template.id }),
    })
    const json = await res.json()
    setCopying(false)
    if (json.templateId) router.push('/templates/' + json.templateId)
  }

  return (
    <div>
      <div className="flex items-start justify-between mt-3 mb-4 gap-4">
        <div className="flex-1">
          <Field value={template.name} className="text-xl font-semibold"
            onSave={v => patch('templates', template.id, 'name', v)} />
          <p className="text-sm text-gray-500 mt-1">
            {counts.sections} sections, {counts.items} items, {counts.comments} comments
            {template.source_filename ? ' - from ' + template.source_filename : ''}
          </p>
        </div>
        <button onClick={duplicate} disabled={copying}
          className="border rounded px-3 py-1.5 text-sm whitespace-nowrap">
          {copying ? 'Copying...' : 'Duplicate template'}
        </button>
      </div>

      {issues.length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <strong className="text-sm">{issues.length} import issue(s)</strong>
          <ul className="mt-1 text-sm list-disc pl-5">
            {issues.map(x => (
              <li key={x.id}>{x.row_index ? 'Row ' + x.row_index + ': ' : ''}{x.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border rounded divide-y">
        {tree.map(s => (
          <div key={s.id} className="p-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(o => ({ ...o, [s.id]: !o[s.id] }))}
                className="w-6 text-gray-500">{open[s.id] ? '-' : '+'}</button>
              <Field value={s.name} className="font-medium"
                onSave={v => patch('sections', s.id, 'name', v)} />
            </div>

            {open[s.id] && (
              <div className="ml-8 mt-3 space-y-3">
                {s.items.map(i => (
                  <div key={i.id}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setOpen(o => ({ ...o, [i.id]: !o[i.id] }))}
                        className="w-6 text-gray-500">{open[i.id] ? '-' : '+'}</button>
                      <Field value={i.name} className="text-sm"
                        onSave={v => patch('items', i.id, 'name', v)} />
                    </div>

                    {open[i.id] && (
                      <div className="ml-8 mt-2 space-y-3">
                        {i.comments.map(c => (
                          <div key={c.id} className="border-l-2 pl-3">
                            <Field value={c.name} className="text-sm"
                              onSave={v => patch('comments', c.id, 'name', v)} />
                            <div className="text-xs text-gray-500 mt-1">
                              {c.comment_type} - {c.answer_type} - source row {c.source_row_index}
                            </div>
                            <CommentBody comment={c} onSave={v => patch('comments', c.id, 'body_html', v)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function CommentBody({ comment, onSave }) {
  const [v, setV] = useState(comment.body_html ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const dirty = v !== (comment.body_html ?? '')

  return (
    <div className="mt-1">
      <textarea value={v} onChange={e => setV(e.target.value)} rows={3}
        className="w-full border rounded px-2 py-1 text-sm font-mono" />
      {dirty && (
        <button onClick={async () => { setSaving(true); await onSave(v); setSaving(false); setSaved(true) }}
          disabled={saving} className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-1">
          {saving ? 'Saving...' : 'Save comment'}
        </button>
      )}
      {saved && <span className="text-xs text-green-700 ml-2">Saved</span>}
    </div>
  )
}
