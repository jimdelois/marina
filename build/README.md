This directory exists in order to provide a pre-existing location into which the Docker build container can copy binaries (as per the `Makefile` scripts).  Without it, there may be permission issues thrown from Docker on initial invocations that attempt to mount a directory that doesn't exist on the Host machine.