Installations:
	sudo apt update
	sudo apt install nodejs npm

Verify installation:
	node -v
	npm -v

Install typescript compiler:
	sudo npm install -g typescript

Verify installation:
	tsc -v

Alternative compiler:
	sudo npm install -g tsx

Compilation:
	tsc scripts/*.ts

To open a site use command:
    python3 -m http.server 8000
    npx serve
    npx local-server
