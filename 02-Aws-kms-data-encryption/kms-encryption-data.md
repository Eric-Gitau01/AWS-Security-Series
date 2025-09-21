<img src="https://cdn.prod.website-files.com/677c400686e724409a5a7409/6790ad949cf622dc8dcd9fe4_nextwork-logo-leather.svg" alt="NextWork" width="300" />

# Encrypt Data with AWS KMS

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-kms)

**Author:** Eric Gitau  
**Email:** gitaueric09@gmail.com

---

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_w0x1y2z3)

---

## Introducing Today's Project!

In this project, I will demonstrate how to use encryption to secure data by creating an encryption key with AWS Key Management Service (KMS), applying that key to encrypt data stored in a DynamoDB table, and then testing access using an IAM user.

### Tools and concepts

Services I used include AWS KMS (Key Management Service), AWS DynamoDB, and AWS IAM. Key concepts I learned include encryption, securing a database table, how KMS manages permissions based on actions rather than just access to the key itself, and creating a test user to validate access controls.

### Project reflection

This project took me approximately a 60 min to complete. The most challenging part was understanding how KMS permissions work and how they differ from general access permissions in IAM. It was most rewarding to see how encryption with KMS effectively secured my DynamoDB data and how I could control access at such a detailed level.

I chose to do this project today because I wanted to gain hands-on experience with securing data in AWS and understand how encryption and access management work in practice. Something that would make learning with NextWork even better is more step-by-step guided labs with real-world scenarios, so learners can directly apply concepts while experimenting in a safe environment.

---

## Encryption and KMS

Encryption is the process of converting readable data (plaintext) into an unreadable format (ciphertext) to protect it from unauthorized access. Companies and developers use encryption to safeguard sensitive information such as customer data, financial records, and application secrets, ensuring confidentiality and compliance with security standards. Encryption keys are unique digital codes that lock (encrypt) and unlock (decrypt) the data, making them a critical part of maintaining secure access to information.

AWS KMS is a fully managed service that makes it easy to create, control, and manage encryption keys used to protect data across AWS services and applications. Key management systems are important because they provide centralized control over who can use and manage encryption keys, simplify compliance with security regulations, reduce the risk of key exposure or misuse, and ensure that sensitive data remains secure throughout its lifecycle.

Encryption keys are broadly categorized as symmetric keys and asymmetric keys. I set up a symmetric key because it uses a single key for both encryption and decryption, making it faster and more efficient for securing large amounts of data, which is ideal for encrypting my DynamoDB table.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_a2b3c4d5)

---

## Encrypting Data

My encryption key will safeguard data in DynamoDB, which is a fast and flexible AWS database service. DynamoDB is ideal for applications that require quick access to large amounts of data, such as gaming, e-commerce, and real-time analytics.

The different encryption options in DynamoDB include DynamoDB-owned keys, AWS-managed keys, and customer-managed keys. Their differences are based on the level of control, flexibility, and responsibility you have over the encryption keys. I selected customer-managed keys because they allow me to have full control over key policies, permissions, and lifecycle management, giving me more flexibility and security customization compared to the other options.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_q8r9s0t1)

---

## Data Visibility

Rather than simply controlling who has access to the key, KMS manages user permissions by controlling the specific actions that users can perform with that key. In our case, even if I gave the test user access to the key, they would still need explicit permission to perform the decrypt action in order to view the encrypted data.

Despite encrypting my DynamoDB table, I could still see the table’s items because I am the authorized user of the encryption key. DynamoDB uses transparent data encryption, which means it automatically handles the encryption and decryption process on my behalf as long as I have the necessary permissions.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_c0d1e2f3)

---

## Denying Access

I configured a new IAM user to validate whether an unauthorized user can access encrypted data. The permission policies I granted this user include AmazonDynamoDBFullAccess, but I did not provide any encryption or decryption permissions with AWS KMS.

After accessing the DynamoDB table as the test user, I encountered an access denied error because the test user does not have permission to perform decryption with the key. This confirmed that the encryption key can be effectively used to secure data.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_w0x1y2z3)

---

## EXTRA: Granting Access

To let my test user use the encryption key, I added the user as a key user in the KMS console. My key policy was updated to allow the network-kms-user to perform actions such as encrypt, decrypt, and re-encrypt using the key.

Using the test user, I retried accessing the DynamoDB table and observed that the user could now see the data inside, which confirmed that assigning a user as a key user is an effective way to grant access to encrypted data.

Encryption secures the data itself rather than the entire resource or service. I could combine encryption with other access control tools, such as security groups and permission policies, to create two layers of security: resource-level protection and data-level protection.

![Image](http://learn.nextwork.org/inspired_purple_vibrant_plum/uploads/aws-security-kms_feffb2fb8)

---

---
