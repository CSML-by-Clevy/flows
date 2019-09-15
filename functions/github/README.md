# Lambda settings

- handler: `index.handler`
- runtime: `nodejs10.x`

# Parameters

- action: "trending|search"
- period: "week|month" (apply for trending request only)
- query: String (apply for search request only)
- language: "python|java|..." (apply for search request only)
