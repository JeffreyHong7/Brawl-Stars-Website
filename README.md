Steps to Access Brawl Stars API Key:

1. Go to https://developer.brawlstars.com/#/
2. Create an account
3. Under your profile name on the top right of the website, click "My Account"
4. Press the "Create New Key" button
5. Call the key whatever you like and provide any description
6. Go to https://www.whatismyip.com/.
7. Copy and paste the IP address specified by "My Public IPv4" under Allowed IP Addresses argument for creating the key
8. You will now see a large sequence of characters called Token.

Steps to Access Website:

1. Download git and NodeJS if they aren't already installed on your device.
2. On your local command line interface, run "git clone https://github.com/JeffreyHong7/Brawl-Stars-Website <name>" to create a local copy of the remote repository where <name> is what you want to call the local copy.
3. Run "cd <name>" to enter the cloned repository
4. Run "npm i" (and "npm audit fix")
5. Within the index.js folder (NOT the index.js in public/scripts), at the top under the initialize variables section, copy and paste your acquired Brawl Stars token within the variable assignment: const token = "YOUR TOKEN HERE" (do not forget the " " around your token)
6. Assuming NodeJS is installed on your device, run node --watch index.js
7. On your web browser, enter the following: localhost:3000

What's Happening Exactly?:
In essence, by following these steps, you're computer is hosting a local copy of this website. This local copy interacts with the Brawl Stars API; however, in order to retrieve data from the API, one needs to be authorized to do so. Creating the token (the initial sequence of steps) allows one to be properly authorized to retrieve data from the Brawl Stars API. Since the okens are specific to IP addresses, using my token that I used to develop the website would not work for you; hence why you needed to create a token of your own.
