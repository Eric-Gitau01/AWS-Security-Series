<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Threat Detection with GuardDuty

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-guardduty)

**Author:** Eric Gitau  
**Email:** gitaueric09@gmail.com

---

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_v1w2x3y4)

---

## Introducing Today's Project!

### Tools and concepts

The services I used for this project were GuardDuty, CloudFormation, S3, and Cloud Shell. Key concepts I learned include SQL injection and command injection, using Linux commands like wget, cat, and jq to retrieve and inspect files, and how malware detection works (using an EICAR test file to verify GuardDuty’s Malware Protection).

### Project reflection

This project took me approximately 2hr to complete. The most challenging part was setting up and carrying out the attacks in a safe and controlled way, while making sure I understood what was happening at each step. The most rewarding part was seeing GuardDuty successfully detect my suspicious activity and malware test file, which proved the value of AI-powered threat detection in protecting AWS environments.

I did this project today to practice using AWS GuardDuty and to gain hands-on experience with AI-powered threat detection. My goal was to understand how GuardDuty works in real-world attack scenarios, and the project met those goals. I was able to simulate attacks, see how GuardDuty generated findings, and learn how to investigate and respond to them.

---

## Project Setup

To set up this project, I deployed a CloudFormation template that launches an insecure web application (OWASP Juice Shop). The three main components are the web application infrastructure, an S3 bucket, and GuardDuty, which helps protect the environment.

The web application deployed is called OWASP Juice Shop. To practice our GuardDuty skills, I will attack the Juice Shop and then visit the GuardDuty console to detect and analyze the findings checking whether it picks up our attacks against the web application.

GuardDuty is an AI-powered threat detection service, which means it is designed to help identify security attacks or vulnerabilities that may affect our AWS resources and environment. When it detects something unusual, it is up to us to investigate and take the necessary action.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_n1o2p3q4)

---

## SQL Injection

The first attack I performed on the web application was SQL injection — injecting malicious SQL code to manipulate how the app queries its database. SQL injection is a serious security risk because it can allow attackers to bypass logins, read, modify, or delete data, and otherwise interfere with application behavior. I used this authorized test to see whether GuardDuty detects and records the activity.

In my SQL injection attack I entered the string ' OR 1=1;-- into the email field on the login page. This payload causes the login query to always evaluate as true, effectively tricking the database into treating the credentials as valid. I performed this as an authorized security test to observe whether GuardDuty detects and logs the activity.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_h1i2j3k4)

---

## Command Injection

Next, I used command injection  a technique that manipulates the web app’s server to run commands submitted through user input (for example, in a form). The Juice Shop app is vulnerable because it does not properly sanitize or validate user input, allowing attacker-supplied commands to execute on the server. I performed this authorized test to see whether the command execution is detected and logged by GuardDuty and to learn how such server-level compromises can be discovered and investigated.

To run command injection, I... The script will execute on the server, create a credentials.json object, and make the UI show [object Object].

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_t3u4v5w6)

---

## Attack Verification

To verify the attack's success, I visited the publicly exposed credential file (credential.json). The file displayed AWS access keys that belong to the EC2 instance and grant access to our AWS environment — meaning anyone who obtains those keys could gain the same level of access. I used this check as an authorized test to confirm the severity of the exposure and to see whether GuardDuty would detect related activity.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_x7y8z9a0)

---

## Using CloudShell for Advanced Attacks

The attack continues in the cloud shell: because it’s a command-line tool I can use with the stolen credentials, I use the cloud shell as my medium to run commands and perform suspicious actions such as listing and downloading data from S3 buckets to demonstrate the impact of exposed credentials and to test whether GuardDuty detects and alerts on this activity.

In Cloud Shell, I downloaded the exposed credential file into my Cloud Shell environment using wget. Next, I used tools like cat and jq to read and pretty-print the downloaded JSON file so the credentials and structure were easy to understand.

I then set up a new AWS CLI profile using the stolen credentials. Creating this profile was necessary because, by default, an attacker does not have access to the victim’s AWS environment. With the new profile in place, I could switch to it and use the permissions tied to those credentials.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_j9k0l1m2)

---

## GuardDuty's Findings

After performing the attack, GuardDuty reported a finding within 15 minutes. Findings are notifications from GuardDuty that something suspicious has happened; they provide additional details about who or what was involved, when it occurred, and other context to help with investigation and remediation.

GuardDuty’s finding was called UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.InsideAWS, which means that credentials belonging to an EC2 instance in my environment were being used from another account. GuardDuty used anomaly detection for this finding because it identified activity that was unusual compared to the normal behavior of the environment, signaling that the credentials were likely stolen and misused.

GuardDuty’s detailed finding showed that an S3 bucket was affected, and the action performed with the stolen credentials was a GetObject request (downloading data). The finding also included the IP address and geographic location of the actor, giving useful context for investigating where the suspicious activity originated.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_v1w2x3y4)

---

## Extra: Malware Protection

For the project extension, I enabled Malware Protection for S3. Malware refers to files that contain harmful code or threats — for example, opening such a file could cause a data breach, delete resources, or compromise the environment. By enabling Malware Protection, GuardDuty can scan S3 objects and alert us if any malicious files are detected.

To test Malware Protection, I uploaded an EICAR  test file into a project bucket . The uploaded file is only designed to alert antivirus softwate

Once I uploaded the malware test file, GuardDuty instantly triggered a finding called Object:S3/MaliciousFile. This confirmed that GuardDuty successfully detected the malicious file. The finding also specified that the threat type was an EICAR Test File, which is a safe test file commonly used to verify antivirus and malware detection systems — meaning it is not an actual virus.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-guardduty_sm42x3y4)

---
