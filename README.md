# ig-download-mcp-server

MCP service for downloading Instagram videos

## Overview
`ig-download-mcp-server` is a lightweight MCP (Model Context Protocol) service that enables downloading Instagram videos programmatically. It uses `btch-downloader` for extracting media URLs and `axios` for efficient downloading.

## Features
- Fetch Instagram video URLs
- Download videos to a specified local path
- Progress tracking and logging
- Built with FastMCP for easy integration

## Usage

Start the MCP service:

```sh
$ git clone https://github.com/handoing/ig-download-mcp-server
```

```json
{
    "mcpServers": {
        "ig-download-mcp-server": {
            "command": "node",
            "args": [
                "path/ig-download-mcp-server/index.js"
            ]
        }
    }
}
```

### API

#### Download Video

**Command:**

```json
{
  "tool": "download",
  "parameters": {
    "url": "https://www.instagram.com/p/DHvN6-xygmQ/",
    "path": "/Users/project/downloads"
  }
}
```

**Response:**

```json
"Instagram download success"
```

## License

MIT License

