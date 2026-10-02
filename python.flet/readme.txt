To run this example need o install flet.
1. Create virtual environment:
sudo apt-get install python3-pip
sudo apt-get install python3-venv

python3 -m venv .venv
source .venv/bin/activate

pip install 'flet[all]'
flet doctor

flet create .
flet run
