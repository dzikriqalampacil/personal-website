This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Bell Setup (Ubuntu VM)

The bell button (`/bell`) now triggers local audio playback directly on the Ubuntu server via `pages/api/bell.js`.

### Default behavior

- API executes `scripts/ring-bell.sh`.
- Script tries these options in order:
	- `paplay /usr/share/sounds/freedesktop/stereo/bell.oga`
	- `aplay -q /usr/share/sounds/alsa/Front_Center.wav`
	- `speaker-test -t sine -f 880 -l 1`

Install at least one audio tool on your VM (for example `pulseaudio-utils` or `alsa-utils`) and ensure your mini PC audio output is routed to the jack speaker.

### Optional environment variables

- `BELL_SCRIPT_PATH` (default: `scripts/ring-bell.sh`)
- `BELL_EXEC_TIMEOUT_MS` (default: `15000`)
- `BELL_PLAY_COMMAND` (custom playback command used by the script, e.g. `paplay /path/to/your/bell.oga`)

Example:

```bash
export BELL_PLAY_COMMAND='paplay /home/ubuntu/sounds/my-bell.oga'
npm run start
```

## Docker Deployment

Build image:

```bash
docker build -t dzikri-website:latest .
```

Run container (with speaker access):

```bash
docker run -d \
	--name dzikri-website \
	--restart unless-stopped \
	-p 3005:3005 \
	--device /dev/snd:/dev/snd \
	-e BELL_PLAY_COMMAND='aplay -q /usr/share/sounds/alsa/Front_Center.wav' \
	dzikri-website:latest
```

If your host audio stack uses PulseAudio/PipeWire socket forwarding instead of direct ALSA device access, mount the socket and set the proper environment variables for your host setup.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
