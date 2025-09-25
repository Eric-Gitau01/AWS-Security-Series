<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Build a Security Monitoring System

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-monitoring)

**Author:** Eric Gitau  
**Email:** gitaueric09@gmail.com

---

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_reghtjy)

---

## Introducing Today's Project!

n this project, I will demonstrate how to set up a monitoring system in AWS using CloudTrail, CloudWatch, and SNS. The purpose of this project is to learn how AWS security and monitoring services work, while also building a working system that can actually send email notifications.

### Tools and concepts

In this project, I used AWS services including CloudTrail, CloudWatch, SNS, IAM roles, S3 buckets, and Secrets Manager. Key concepts I learned include securely storing secrets, understanding the differences between CloudWatch and CloudTrail, how notifications work, the different types of endpoints for notifications, and how to create and configure CloudWatch metrics and alarms.

### Project reflection

This project took me approximately 3hr to complete. The most challenging part was configuring CloudWatch correctly to ensure the alarm triggered only for the specific events I wanted to monitor. It was most rewarding to see the system successfully detect secret access and send a timely notification, confirming that my monitoring setup was fully functional.

---

## Create a Secret

AWS Secrets Manager is a security service for storing sensitive information such as database credentials, account IDs, API keys, or any other data that could cause damage or trouble if leaked. These secrets should never be exposed or left in code.

For this project, I created a secret called TopSecretInfo in AWS Secrets Manager. This secret is stored as a string and contains a personal note: I need 3 coffees a day to function.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_o5p6q7r8)

---

## Set Up CloudTrail

CloudTrail is a monitoring service used to track events and activities in an AWS account. The logs it generates are very helpful for detecting suspicious activities, ensuring compliance (proving that you are following required rules or standards), and troubleshooting by showing what happened or what changes occurred if something breaks.

CloudTrail events include types such as management events (operations performed on AWS resources like creating or deleting a VPC), data events (access or changes to data within resources such as reading an object from S3 or accessing a secret in Secrets Manager), and insight events (unusual or anomalous activity detected in your account).

### Read vs Write Activity

Read API activity involves accessing, reading, or opening a resource, while Write API activity involves creating, deleting, or updating a resource. For this project, I enabled both types of activities to learn how they work, although in practice I only need Write activities since accessing a secret is considered a Write activity due to its sensitivity and importance.

---

## Verifying CloudTrail

I retrieved the secret in two ways: first, through the Secrets Manager console, where I could easily click the “Retrieve secret value” button; and second, using the AWS CLI by running a get-secret-value command in CloudShell.

To analyze my CloudTrail events and see when the secret was accessed, I visited the Event History in CloudTrail. I found a GetSecretValue event recorded, whether I accessed the secret through the CLI or the console. This confirms that CloudTrail can detect and track whenever a Secrets Manager key is accessed.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_s8t9u0v1)

---

## CloudWatch Metrics

CloudWatch Logs is a monitoring service that collects logs from other AWS services, including CloudTrail, to help analyze activities and create alarms. It is important for monitoring because it allows you to be alerted based on specific events that occur in your AWS account.

CloudTrail's Event History is useful for quickly viewing management events that occurred in the last 90 days. In contrast, CloudWatch Logs are better for combining logs from different sources, storing logs for longer than 90 days, and performing advanced filtering and analysis.

A CloudWatch metric is a specific way to count or track events within a log group. When setting up a metric, the metric value determines how an event is counted or incremented when it matches the filters. In my case, I increment the metric by 1 whenever my secret is accessed. The default value is used when the event we are tracking does not occur.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_a9b0c1d2)

---

## CloudWatch Alarm

A CloudWatch alarm is a feature and alert system in CloudWatch that is designed to trigger when certain conditions are met in a log group. I set my CloudWatch alarm threshold based on how many times the GetSecretValue event occurs within a 5-minute period. The alarm will trigger when the average number of occurrences exceeds 1.

I created an SNS topic as part of this setup. An SNS topic acts like a newsletter or broadcast channel that email addresses, phone numbers, functions, or apps can subscribe to, allowing them to receive notifications whenever the SNS topic has an update. My SNS topic is configured to send an email whenever our secret is accessed.

AWS requires email confirmation for SNS subscriptions to ensure that the recipient actually owns the email address. This helps prevent unauthorized subscriptions and ensures that notifications are sent only to intended recipients.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_fsdghstt)

---

## Troubleshooting Notification Errors

To test my monitoring system, I accessed my secret again. However, the results were not successful—I did not receive any email or notification about the secret being accessed.

When troubleshooting the notification issues, I investigated every part of my monitoring system. I checked whether CloudTrail was capturing events when I accessed my secret, whether CloudTrail was sending logs to CloudWatch, whether the filters were accidentally blocking the correct events, and whether the CloudWatch alarm was properly configured to send an email.

I initially didn’t receive an email because CloudWatch was configured with the wrong threshold. Instead of calculating the sum of how many times the secret was accessed within a time period, it was incorrectly set to calculate the average, which prevented the alarm from triggering.

---

## Success!

To confirm that our monitoring system can successfully detect and alert when my secret is accessed, I checked my secret value one more time. I received an email within 1–2 minutes of the event, and the CloudWatch alarm also entered the ALARM state, indicating that the system is working as intended.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_ageraergearge)

---

## Comparing CloudWatch with CloudTrail Notifications

In a project extension, I enabled SNS notification delivery in CloudTrail. This allows us to compare CloudTrail and CloudWatch in terms of notifying us about events, such as when our secret is accessed

After enabling CloudTrail SNS notifications, my inbox quickly filled with emails from SNS, as each event recorded by CloudTrail triggered a notification. While the emails were informative, the volume was overwhelming since many management events were being reported. Most of the notifications simply indicated that new items had been stored in my buckets, which was less critical for my monitoring needs.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-monitoring_d7e8f9g0)

---

---
