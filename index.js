import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { FastMCP, UserError } from "fastmcp";
import { z } from "zod";
import { igdl } from 'btch-downloader';
import axios from 'axios';

async function downloadVideo(url, saveDir, log) {
  try {
    log.info('Starting video download...', { url });

    const response = await axios.get(url, { responseType: 'stream' });

    const fileName = createHash('sha256').update(url).digest('hex').slice(0, 8) + '.mp4';
    const savePath = path.join(saveDir, fileName);

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    log.info(`Video download complete! File saved as: ${savePath}`);
  } catch (error) {
    log.error(`Failed to download video: ${error.message}`);
  }
}

const server = new FastMCP({ name: "ig-downloader", version: "1.0.0" });

server.addTool({
  name: "download",
  description: "Instagram downloader",
  parameters: z.object({
    url: z.string().describe("Instagram website address (e.g. https://www.instagram.com/p/DHvN6-xygmQ/, https://www.instagram.com/p/DHaq23Oy1iV/)")
      .url(),
    path: z.string().describe("Download local path (e.g. /Users/project/vue, /Users/download)"),
  }),
  execute: async ({ url, path }, { log, reportProgress }) => {
    try {
      const data = await igdl(url);
      if (!data || !data[0]?.url) {
        throw new UserError("No downloadable video found.");
      }
      await downloadVideo(data[0].url, path, log, reportProgress);
      return 'Instagram download success';
    } catch (e) {
      log.error(`Instagram download error: ${e.message}`);
      return 'Instagram download error';
    }
  },
});

server.start({ transportType: "stdio" });
