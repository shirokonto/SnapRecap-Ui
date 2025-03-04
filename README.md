# SnapRecap
Transcribes and summarizes video content and let user export the summary on Confluence or as PDF.\
SnapRecap as a whole works only in combination with this repository as UI and [SnapRecap-Srv](https://github.com/shirokonto/whisper-subtitles).

## Features
SnapRecap offers users to upload video files in .mp4 format and generate a short summary of the content. 

### Upload Video
In the Upload tab, choose a fitting title that will later be used for the exported summary.\
Upload a video that you want to transcribe and summarize.\
Choose between summarizing the whole video content or chapter-wise by defining sections.

### Verify Result
The result will be displayed in the Verify tab after a few seconds or minutes, depending on the video length.\
Edit the summarization result in the text editor or check the transcript, that was generated from the video.

### Export Result
Download the result as a PDF file or export it to Confluence.\
Choose between updating an existing page or create a new subpage under the given page ID.\
The Confluence Base Url can be set in the .env file of the server.

## Setup

### `npm start`
Run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
