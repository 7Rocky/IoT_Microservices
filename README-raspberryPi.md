# Use Kubernetes cluster on a Raspberry Pi

Download the following program: [Raspberry Pi Imager](https://downloads.raspberrypi.org/imager/imager.dmg).

This program will be used to generate a bootable OS image for the Raspberry Pi. Select this OS: Ubuntu server 20.04 LTS 64 bits (Raspberri Pi 3 / 4). Teh select the SD card to flash de OS.

Once the SD card is ready, connect your Raspberry Pi to a keyboard and a screen. You should also connect it to the network via Ethernet.

You will see a login after some traces. Type user "ubuntu" and password "ubuntu". Then, you will be asked to introduce a new password.

```bash
sudo apt update
sudo apt upgrade
sudo apt autoremove

sudo apt install net-tools
ifconfig
```

Use the following YAML file to setup a static IP address on your Raspberry Pi, so that every time it boots it has the same IP address and you can connect via SSH.

```yaml
network:
  ethernets:
    eth0:
      addresses: [ 192.168.1.222/24 ]
      dhcp4: false
      gateway4: 192.168.1.1
      nameservers:
        addresses: [ 8.8.8.8, 8.8.4.4 ]
  version: 2
```

```bash
sudo vim /etc/netplan/50-cloud-init.yaml
sudo netplan apply
```

Append `cgroup_enable=memory cgroup_memory=1` to the following file (this is for using MicroK8s). For more information, see https://microk8s.io/docs/install-alternatives#arm. Then you will need to restart your Raspberry Pi.

```bash
sudo vim /boot/firmware/cmdline.txt
sudo reboot
```

Finally, install MicroK8s. You can follow these commands, which are taken from https://microk8s.io/docs/.

```bash
sudo snap install microk8s --classic
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
su - $USER

microk8s status --wait-ready
microk8s kubectl get nodes

echo "alias kubectl='microk8s kubectl'" >> ~/.bash_aliases
source .bash_aliases

microk8s enable dns ingress storage
```

Hope it is useful!
