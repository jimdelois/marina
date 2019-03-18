# Marina

A tool chain to organize multiple `docker-compose`-ified applications into logical groupings known as "Stacks," with a specific focus on easing the process of local development.

***Marina is currently under active PoC/Development. Like, literally everything is subject to change with or without notice (but definitely without).***

## Overview

### Problem Space

Docker-Compose improves the usability of Docker, itself, by providing configuration-driven, versionable descriptors and a DSL for `docker run` commands, backed by an intuitive CLI.  A single service within an application may require several environment variables, networking configurations, startup commands, etc, with values differing for each deployment environment.  This addition to the Docker landscape has greatly eased the management of single- and multi-service applications for all tiers of deployment, including local development.

In today's micro-service world, local development of a single application may sometimes require the coincident development of other, related applications.  Further, each application (possibly with multiple services therein) may exist in distinctly different VCS repositories and, as such, have no single, centralized `docker-compose` file to manage these cross-repo application dependencies.

An example may be a suite of applications that, together, comprise a partial E-Commerce system in the enterprise.  This subsystem may rely on multiple applications such an SPA web UX, a User Auth API, Search API, Transaction-API, etc.  On the local, it may be preferable to add a reverse proxy such as NGinx Proxy for logical and standardized request routing.  Each of these applications are developed with their own repositories and independent release cycles, etc.  Harmonizing them for local development, or even declaring them as interdependent, is well-beyond the scope of Docker Compose et al.

### Proposal
While tools like Swarm (etc) exist for managing Docker clusters and multiple services, and CloudFormation (etc) for invoking declarative and atomic operations of entire infrastructures (including Service deployments)...
 
***Marina** specifically sets out to ease coincident or controlled local development of multiple Dockerized applications.*

Marina does this by providing a configuration DSL to specify:
- **Applications:** Individual VCS applications with a local `docker-compose.yml` file that specifies its all its services for the local.
- **Stacks:** Groups of Applications, with directional dependencies as needed.
- (There will be additional configuration categories in the future)

*Note:* By separating Applications from Stacks, some Applications may be shared across entire Stacks (such as a fronting proxy, etc).

## Current Usage

The CLI is the only module currently being developed.

### Installation of Marina CLI

Due to a complicated set of intricacies surrounding local file mounts of source directories, local storage of the `marina.json` Config file, and some chicken/egg problems, the simplest installation of the `marina` CLI tool is directly onto the Host machine (as opposed to shipping Marina as an already-Dockerized tool, itself).

#### Binary Executable

We leverage the [Pkg Node Module](https://github.com/zeit/pkg) to compile the CLI into a binary executable, removing the dependency for a Node 10 runtime on the Host machine.

```
$> git clone git@github.com:jimdelois/marina.git
$> npm install
$> npm run build
$> cp ./build/marina /usr/loca/bin/marina  # Or any other directory of your choosing
$> npm run clean
```

#### Marina Development

If the Host machine has a Node 10 runtime, etc, this CLI script may simply be linked on it.  Updates to the source files will immediately be reflected in the system-linked script.

```
$> git clone git@github.com:jimdelois/marina.git
$> npm install
$> npm link
```
 
#### Homebrew

Versioned binaries will shortly be available via the Homebrew package manager. This will eventually be the preferred method of distribution.

### Invoking and Usage
Start with the basic `marina` command for the default Help menu, which will assist further.

```
$> marina
Marina is a toolset for managing multiple Dockerized application stacks.

General Usage:
 marina [general options] <command> [command-specific options] [<..etc>]

Examples:
 marina config test
 marina -f /path/to/marina.json stacks ls
 marina stack up StackName

Commands:
 marina generate-completion  Generate a bash completion script
 marina applications         Interact with the collection of Applications                   [aliases: as]
 marina config               Operate with/on a given Configuration file                      [aliases: c]
 marina initialize           Creates a new Marina config file from scratch and initializes for use
                                                                                       [aliases: init, i]
 marina stack                Interact with an individual Stack                               [aliases: s]
 marina stacks               Interact with the collection of Stacks                         [aliases: ss]

Options:
 -h, --help     Show help                                                                       [boolean]
 -f, --file     Configuration file    [string] [required] [default: "/Users/jdelois/.marina/marina.json"]
 --verbose      Verbose Output                                                                  [boolean]
 --debug        Debug Output                                                                    [boolean]
 -v, --version  Show version number                                                             [boolean]

Copyright 2019 - Jim DeLois - https://github.com/jimdelois/marina
```


## General Roadmap
- [x] Round out basic functionality
  - [x] Basic Commands: Up/Down/Clean
  - [x] Config
    - [x] Stack Addition and Removal
    - [x] Application Addition and Removal
    - [x] Application linking/unlinking to/from Stacks
    - [x] Export
  - [x] Tool Initialization
- [ ] Status Commands
- [ ] SCM / Version Control Integration
- [ ] Guide / Walkthrough - GitHub Pages?
- [x] Compilation to distributable binary
- [ ] Make available in Homebrew
- [ ] hapi.js HTTP API
- [ ] Fronting UX App
- [ ] Electron version of Fronting App?

