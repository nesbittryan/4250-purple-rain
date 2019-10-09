# Purple Rain

## Setting up for local dev

### Mac OS 

start by installing these dependencies using brew. 

```brew install yarn
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

Setup React native CLI: 

`npm install -g react-native-cli`

Install X-code using the Mac Appstore (needs version 9.4 or later)

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

#### Running on local simulator 

You'll be able to use macs iPhone simulators that come with Xcode. From the project run

`react-native run-ios`