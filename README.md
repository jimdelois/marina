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

#### Manual Installation

With Docker installed on the Host machine, the following commands will install the Marina CLI tool to `/usr/local/bin/marina`.

```
$> git clone git@github.com:jimdelois/marina.git
$> cd marina
$> make && make install && make clean
```

##### Notes
- The target install location shall be configurable in the future
- Currently, only Mac OS is supported. It should be a trivial matter to enable the other architectures supported by `pkg`. 

#### Marina Development

If the Host machine has a Node 10 runtime, etc, this CLI script may simply be linked on it.  Updates to the source files will immediately be reflected in the system-linked script.

```
$> git clone git@github.com:jimdelois/marina.git
$> cd marina
$> npm install
$> npm link
```
 
#### Homebrew

Versioned binaries will shortly be available via the Homebrew package manager. This will eventually be the preferred method of distribution.

### Quick Start

#### The Marina Config File

Marina persists all data on the file system in a Configuration file.  You can see an example of the syntax by issuing `marina config example`.  By default, Marina will store this in `~/.marina/marina.json`.  However, this value can be overridden with the `-f` option or by supplying an environment variable of the form `MARINA_CONFIG=/path/to/marina.json`.  By placing the latter in your `~/.bash_profile` (or similar), you can effectively store the file anywhere and Marina will use it automatically.

To get started, generate a new Configuration (using the default, or any options cited above) with:

```
$> marina init

Wrote new Config file at /Users/jimdelois/.marina/marina.json.
```

#### Defining Applications in a Stack

Supposing there is a Docker-Composed **Application** rooted in the current directory, the following command will register it into Marina:

```
$> marina applications add \
    --name "Acme API" \
    --type "LOCAL" \
    --docker-compose-filename "docker-compose.override.yml"
    --path $(pwd)

Application "Acme API" added.
```

**NOTE:** Any options omitted will be requested via an interactive prompt. Relatedly, the file `docker-compose.yml` will be used if not specified.  At this time, only the `LOCAL` Application "type" is supported, implying a locally-defined Docker Compose -ready application.

Add another:

```
$> marina applications add \
    --name "Acme Website" \
    --type "LOCAL" \
    --path "/development/projects/acme/website"

Application "Acme Website" added.
```

Marina **Stacks** are logical groupings of separate Applications to be interacted with collectively.  Once a Stack exists, any Applications regsitered into Marina can be added into the grouping, or removed, etc.

Create a Stack:

```
$> marina stacks add --name "The Acme Stack"

Stack "The Acme Stack" added.
```

Now bind the two previously-created Applications to it:

```
$> marina applications link "Acme API" "The Acme Stack" && \
   marina applications link "Acme Website" "The Acme Stack"

Application "Acme API" added to Stack "The Acme Stack".
Application "Acme Website" added to Stack "The Acme Stack".
```

#### Reviewing Current Configurations

There are various ways to view the current Configuration, at different levels:

```
$> marina stack ls "The Acme Stack"

STACK NAME           ID                                   APPS
The Acme Stack       6f294762-b1ff-4a93-b7cb-1c160ff03404    2

APP NAME             ID                                   TYPE
Acme API             da278a79-1bc7-470d-bc3b-9f06bdc0263e Local
Acme Website         1f8d737c-f81d-42cf-b47f-6c01ac21622e Local
```

Or (among others - view the Help for other informative outputs), e.g.:

```
$> marina config dump

<< contents omitted >>
```

#### Working with Stacks

The point of Marina is to operate on groups of Applications (Stacks) as a whole.  With the definitions and associations in place, we can build all of the Applications at once and bring all services for all Application up with commands such as the following:

```
$> marina stack build "The Acme Stack" && \
   marina stack up "The Acme Stack"
```

All Applications should be built and started in tandem.  Stop the containers (noting that for all "name" inputs, you can always specify the resource's UUID):

```
$> marina stack down 6f294762-b1ff-4a93-b7cb-1c160ff03404
```

### More Usage

Until full documentation is available, use the basic `marina` command for the default Help menu:.

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

