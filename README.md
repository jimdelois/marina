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

### Installation (Temporary)

```
$> git clone git@github.com:jimdelois/marina.git
$> cd marina
$> npm install
$> npm link
```

*Note: This will eventually be a Dockerized image with a `marina` entrypoint and a helper script to install as a single executable on a host system.*

### Invoking
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
 marina stack                Interact with an individual Stack                               [aliases: s]
 marina stacks               Interact with all Stacks collectively                          [aliases: ss]

Options:
 -h, --help     Show help                                                                       [boolean]
 -f, --file     Configuration file    [string] [required] [default: "/Users/jdelois/.marina/marina.json"]
 --verbose      Verbose Output                                                                  [boolean]
 --debug        Debug Output                                                                    [boolean]
 -v, --version  Show version number                                                             [boolean]

Copyright 2019 - Jim DeLois - https://github.com/jimdelois/marina
```


## Roadmap
- Round out basic functionality (MVP is TBD)
- Dockerize
- Create install script
- hapi.js HTTP API
- Fronting UX app

