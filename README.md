# Surge Action
This action will auto deploy your client-side app like React, Preact, svelte, Astro and any html, js project
explore [surge](https://surge.sh) for more details

## Inputs

### `domain`

**Required** the name of the sub domain on surge.sh. Default `random value`.

supporting for custom domains is coming soon

### `env token`
you have to use surge and have account

so you have to insall it `npm i -g surge`
then `surge login` will let you create an account 

then get your token `surge token`

**Required** the SURGE_TOKEN is used to authenticate on your behalf.

supporting for custom domains is coming soon


## Outputs

### `domain`

the domain name and details about your deployment.

## Example usage

```yaml
on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    name: Build the code
    steps:
      - name: checkout the project
        uses: actions/checkout@v3
      - name: install deps
        uses: actions/setup-node@v3
        with:
          node-version: v16.x
      - name: build the project
        run: |
         npm install -g pnpm
         pnpm i
         npm run build
         
      - name: deploying to surge
        uses: mahmoudgalalz/surge-action@v0.1.5
        with:
          domain: 'ghtop.surge.sh'
          path: './dist'
        env:
          SURGE_TOKEN: ${{ secrets.SURGE_TOKEN }}
```

## contribution

feel free to send issue, or feature
