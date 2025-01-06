# release-tag

[![GitHub license](https://img.shields.io/github/license/Liquid-JS/release-tag.svg)](https://github.com/Liquid-JS/release-tag/blob/master/LICENSE)

This is a fork of [actions/create-release](https://github.com/actions/create-release) with the following changes:

- Automatically determine whether a tag is a pre-release by checking for presence of `-` followed by a letter in the tag name.
- Use [changelogen](https://github.com/unjs/changelogen) to generate the changelog as release body.

## Usage

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
        uses: Liquid-JS/release-tag@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
```
