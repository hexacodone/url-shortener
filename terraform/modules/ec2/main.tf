resource "aws_instance" "main" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  subnet_id                   = var.subnet_id
  vpc_security_group_ids     = [aws_security_group.instance.id]
  key_name                   = aws_key_pair.deployer.key_name
  monitoring                 = var.enable_detailed_monitoring

  root_block_device {
    volume_size = var.volume_size
    volume_type = var.root_volume_type
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              apt-get install -y docker-compose
              EOF

  tags = merge(
    {
      Name        = "${var.project_name}-${var.environment}"
      Environment = var.environment
      Managed_by  = "terraform"
    },
    var.tags
  )
}

resource "aws_security_group" "instance" {
  name_prefix = "${var.project_name}-${var.environment}"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidr
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    {
      Name        = "${var.project_name}-${var.environment}"
      Environment = var.environment
      Managed_by  = "terraform"
    },
    var.tags
  )
}