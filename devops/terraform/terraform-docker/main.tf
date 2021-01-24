# Refer https://www.terraform.io/docs/providers/docker/index.html

terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
  }
}

# Configure the Docker provider
provider "docker" {
  # FOR REMOTE USE: 
  # Refer https://stackoverflow.com/a/52170405
  /* host = "tcp://127.0.0.1:2376/" */
}

# Create docker image
resource "docker_image" "ubuntu" {
  name = "ubuntu:latest"
}

# Create a container
resource "docker_container" "foo" {
  image = "${docker_image.ubuntu.latest}"
  name  = "foo"
  ports {
    internal = 80
    external = 8000
  }
}

