// Serverless function — proxy securisé vers l'API Anthropic
// Déployée automatiquement par Vercel sur /api/results
// La clé API est lue depuis la variable d'environnement ANTHROPIC_API_KEY

export default async function handler(req, res) {
  // CORS headers (au cas où)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY not configured',
      content: [{ type: 'text', text: '{"error":"API key missing on server"}' }]
    });
  }

  try {
    const { systemPrompt, userMsg } = req.body || {};
    if (!systemPrompt || !userMsg) {
      return res.status(400).json({ error: 'Missing systemPrompt or userMsg' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: userMsg }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Anthropic API error',
        content: [{ type: 'text', text: '{"error":"API call failed"}' }]
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({
      error: err.message,
      content: [{ type: 'text', text: '{"error":"Server error"}' }]
    });
  }
}
