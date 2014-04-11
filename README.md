# Expand-o

Deploy expanding iframe interactives to S3.

## Install and setup

Run the following from terminal.

```bash
> grunt clone git@github.com:GuardianInteractive/expando.git
> cd expando
> npm install
```

## Local testing

You can see a demo of the iframe running locally at http://localhost:9001/ by
running:

```bash
> grunt
```

## Configure the interactive

All the interactive settings are stores in `src/settings.json` these are:

```json
{
    "launchImage": "path to image that is clicked to launch the iframe",
    "iframeURL": "URL to the iframed page",
    "S3NextGenPath": "S3 after /next-gen/ eg. /world/ng-interactive/apr/example/"
}

```


## Deploying

To test you setting run the interactive locally

```bash
> grunt
```

To test the deploy run:

```bash
> grunt test-deploy
```

To deploy to S3:

```bash
> grunt deploy
```

## R2 code object

The build folder will contain a file called `r2_code_block.html`. The contents
of this file can be pasted in to the R2 page.


