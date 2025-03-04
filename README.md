# release-tag

This is a fork of [actions/create-release](https://github.com/actions/create-release) with the following changes:

- Automatically determine whether a tag is a pre-release by checking for presence of `-` followed by a letter in the tag name.
- Use [changelogen](https://github.com/unjs/changelogen) to generate the changelog as release body.

Usage:

Enable Read/Write access for the default `GITHUB_TOKEN` in the repo Settings -> Actions.

```yaml
name: Create release

# When a tag is pushed, create a release
on:
  push:
    tags:
      - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
        with:
          fetch-depth: 0 # Fetch all tags

      - name: Create Release for Tag
        id: release_tag
        uses: Akryum/release-tag
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
```
