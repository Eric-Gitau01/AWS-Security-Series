<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Secure Secrets with Secrets Manager

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-secretsmanager)

**Author:** Eric Gitau  
**Email:** gitaueric09@gmail.com

---

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_r7s8t9u0)

---

## Introducing Today's Project!

In this project, I will demonstrate how to use AWS Secrets Manager for secure credentials management. The goal of this project is to learn how to protect my credentials when connecting a live (production) application to my AWS environment and databases.

### Tools and concepts

In this project, the services I used included AWS Secrets Manager, GitHub, Amazon S3, and IAM. Some of the key concepts I learned were the importance of avoiding hardcoded credentials, how GitHub secret scanning can detect exposed secrets, how to use Git rebase to rewrite the commit history of a repository, and the difference between forking a repository and simply cloning it.

### Project reflection

This project took me approximately a 3 hr to complete. The most challenging part was resolving issues related to hardcoded credentials and cleaning up the commit history. The most rewarding part was successfully integrating AWS Secrets Manager to securely manage credentials and seeing my application run without exposing sensitive information.

I chose to do this project today because I wanted to strengthen my skills in secure credential management and learn how to protect applications running in AWS. Something that would make learning with NextWork even better is having more hands-on projects that simulate real-world security challenges.

---

## Hardcoding credentials

In this project, a sample web application is exposing the developer’s AWS credentials, including the Access Key ID and Secret Access Key. Hardcoding credentials is unsafe because once the code is made public in a repository, anyone can access these credentials and gain unauthorized access to the AWS environment, potentially deleting resources, stealing data, or performing other malicious actions.

I have set up the initial configuration using a set of Access Key ID and Secret Access Key. These credentials are just examples, as using test credentials prevents exposing my actual AWS credentials while working on this project.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_j2k3l4m5)

---

## Using my own AWS credentials

As an extension of this project, I decided to run the web application locally using my own credentials to set up a virtual environment. I installed packages such as boto3, uvicorn, and FastAPI, which are required by the main application file (app.py) to connect the web app to AWS services.

When I first ran the application, I encountered an InvalidAccessKeyId error because I was using test credentials in config.py that actually pointed to a real AWS account.

To resolve the InvalidAccessKeyId error, I updated the configuration file (config.py) to use my AWS account’s Access Key ID and Secret Access Key, replacing the test credentials.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_wghjteykut)

---

## Pushing Insecure Code to GitHub

Once I updated the web application code with credentials, I forked the repository to simulate what it would be like to push insecure code into my public repository. A fork differs from a clone in that it creates a new repository in my GitHub account, whereas a clone only copies the code to my local machine.

To connect my local repository to the forked repository, I ran the command git remote set-url origin <forked-repo-URL>. I then used git add and git commit to save the changes I made to config.py. Finally, git push uploaded those changes to the remote origin, i.e., the forked repository on GitHub.

GitHub blocked my push because its secret scanning feature detected that I was hardcoding AWS credentials. This is a valuable security feature, as it prevents sensitive information from being exposed in a public repository.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_o2p3q4r5)

---

## Secrets Manager

AWS Secrets Manager is a fully managed service that helps protect access to applications, services, and IT resources without the need to hardcode sensitive information such as credentials in your code. I am using it in this project to securely store my AWS credentials and retrieve them when needed by the application. Other common use cases for Secrets Manager include storing database connection strings, API keys, OAuth tokens, and other sensitive configuration details.

Another important feature in AWS Secrets Manager is secret rotation, which automatically updates the value of a secret on a consistent schedule. This generates new values for the secret and is especially useful in high-risk situations where I want to minimize how long an attacker could access my database or API key if my credentials or services were ever compromised.

AWS Secrets Manager provides sample code in various programming languages such as Java, JavaScript, C#, Python, Ruby, Go, and Rust. This is helpful because I can use the sample code directly in my config.py file to update how I retrieve credentials. Instead of hardcoding them, I can now use a function that connects to Secrets Manager to securely fetch the credentials when needed.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_h2i3j4k5)

---

## Updating the web app code

I updated the config.py file to retrieve secrets stored in AWS Secrets Manager programmatically. The get_secret() function establishes a connection to Secrets Manager using boto3, retrieves the value of the secret I created during setup, and stores that secret in a variable called secret.

I also added code to config.py to extract the values of the secret stored in AWS Secrets Manager. This step is important because the configuration file no longer contains hardcoded credentials. Instead, it uses the function provided in the sample code to retrieve the secret, then splits the secret value to store the Access Key ID and Secret Access Key in the same variables that app.py continues to use.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_v0w1x2y3)

---

## Rebasing the repository

Git rebasing is the process of rewriting or modifying the commit history of a repository. I used it to drop the commit where I had hardcoded the AWS credentials. This step was necessary because even after removing the credentials from the code, they still existed in the commit history of the repository — and as long as they remain there, they are discoverable to attackers.

During the rebase process, a merge conflict occurred because the changes I made in one commit overlapped with the modifications from another commit. I resolved the merge conflict by manually editing the affected files, keeping the correct version of the code, and then using git add <filename> to stage the resolved files. Finally, I ran git rebase --continue to complete the rebase process.

Once the merge conflict was resolved, I verified that my GitHub repository was no longer exposing any credentials. I checked the config.py file in the forked repository and confirmed that it now uses code to securely extract my credentials instead of hardcoding them. I then successfully pushed my code without any blocking from GitHub’s secret scanning feature.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-secretsmanager_t5u6v7w8)

---

---
