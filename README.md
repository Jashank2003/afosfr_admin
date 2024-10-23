# PalatePrestige

<br />
<div align="center">
  <!-- Next.js -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  
  <!-- React -->
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  
  <!-- Flutter -->
  <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
  
  <!-- Node.js -->
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  
  <!-- JavaScript -->
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  
  <!-- Dart -->
  <img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white" alt="Dart" />
  
  <!-- MongoDB -->
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  
  <!-- NextAuth.js -->
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="NextAuth.js" />
  
  <!-- Firebase -->
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />

  <!-- WebSockets -->
  <img src="https://img.shields.io/badge/WebSockets-4EA94B?style=for-the-badge&logo=websocket&logoColor=white" alt="WebSockets" />

  <!-- Razorpay -->
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
  
  <!-- Cloudinary -->
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />

  <!-- Redis -->
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />

  <!-- Tailwind CSS -->
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />
<br />
<br />


![Screenshot 2024-10-23 220632](https://github.com/user-attachments/assets/68daec9c-304d-4539-a2cc-9ad157edbdfd)
<br/>


![Screenshot 2024-10-22 015151](https://github.com/user-attachments/assets/30746881-2c12-4201-9160-f93a8957f9dc)
<br/>
![Screenshot 2024-05-14 212839](https://github.com/Jashank2003/afosfr_admin/assets/91665950/e615872c-6b4b-44df-a7f0-ac69a808871f)
<br/>
![Screenshot 2024-05-18 135359](https://github.com/Jashank2003/afosfr_admin/assets/91665950/2f4d0671-4338-4918-a521-4a50d292b81e)
<br/>

## Setting up Environment Variables

To securely manage sensitive information such as database URLs, we utilize environment variables. Follow these steps to set up your environment variables:

make a file in root directory named as .env and add 

```javascript
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="Your cld name"
DATABASE_URL: "mongodb url"
CLD_API_NM:"cld api name"
CLD_API_KEY: "cld api key"
CLD_API_SECRET: "cld api secret"
```

## Contributing



1. Fork the repository by clicking the "Fork" button at the top right corner of this page.

2. Clone your fork of the repository to your local machine:
    go to your forked repo click on code there you can find the https link(your_fork_url)
    now open terminal and  

    ```
    git clone <your_fork_url>
    ```
    also 
    ```
    git remote add upstream <original_repository_URL>
    ```
    This allows you to fetch changes from the original repository to keep your fork up-to-date.


3. Create a new branch for your changes:
    ```
    git checkout -b <NEW_BRANCH_NAME>
    ```
    */Mark that this step is optional, it only creates a new branch to existing repo
        You can continue with master branch only/* 

4. Make your changes to the codebase. Ensure that your changes follow the project's coding conventions and standards.

5. Commit your changes with descriptive commit messages:
    ```
    git add .
    git commit -m 'Add some feature'
    ```

6. Push your changes to your fork:
    ```
    git push origin <NEW_BRANCH_NAME>
    ```

7. Navigate to the original repository (this repository) and click on the "Compare & pull request" button.

8. Provide a clear title and description for your pull request, detailing the purpose of your changes.

9. Click on the "Create pull request" button to submit your pull request.



## Syncing the repo on local repo

1.  It will fetch the updated repo from the github

         ```
          git fetch upstream
         ```


3.  It is used to select the branch to make changes

         ```
        git checkout master
         ```


5.  It is used to merge the codebase on your local machine

         ```
        git merge upstream/master
         ```

7.  IDK what it is used for but as someone said to run it, I did and you should too.        

         ```
        git rebase upstream/master
         ```

NOTE: If using any branch except master change the master with your branch name with that in 3&4.