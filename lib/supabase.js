import { createClient } from '@supabase/supabase-js'

const options = {
    auth: { persistSession: false },
}

// Node 20 has no global WebSocket; supabase-js builds a realtime client on
// startup regardless of whether we use it. Supply ws when running server-side.
if (typeof WebSocket === 'undefined') {
    const ws = (await
        import ('ws')).default
    options.realtime = { transport: ws }
}

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
)