# README Staff Admin

## Description
This project started on February 2021, as a successor of the **Staff** repository, to divide its features in two: **Internal** and **Admin**.
**Admin** has as a goal to be the front-end that requests to **Internal** API, related to Shipit's administrative tasks (BackOffice).
## Access request

| Resource                | Responsible                               |
|-------------------------|-------------------------------------------|
| [Github Repository](https://github.com/shipit-team/admin) | Team leader|
| Deploy                  | Deployers team                            |

## Software requirements

|                         |                      |
|-------------------------|----------------------|
| Programming language    | Node (12.13.1)       |
| Framework               | NextJS (9.3.4)       |

## Useful information

|                         |                      |
|-------------------------|----------------------|
| Server PORT             | 3005                 |

## General steps to run the project.
1. Fulfill the Software Requirements:
    - [Install Node](https://nodejs.org/en/download/).
    >**Recommendation**: Install the **Internal** repository prior to this project, since its API is the one Admin uses to render most of its views.
    
    >**Recommendation**: Install the **Prices** repository prior to this project, since its API is used to render many views.
2. Set up your database **Core**, and upgrade it with it [respective dump](https://drive.google.com/drive/folders/1atNZ3fKi6METQcmcK0J2fry4fON8z3Va).

    >**Note**: Take into consideration that the DB migrations must have been run among the Staff, Clientes, and Core repositories so the DB restore works correctly.

3. Install the repository on your local directory [via GIT](https://docs.github.com/en/github/getting-started-with-github/getting-started-with-git/about-remote-repositories).
4. Create the `.env` file on the root of the repository with the required environment variables.

    >**Note**: this file may have already been created in the repository, so it shouldn't be needed in that case.

    - An example of environment variables:
    ```
    AUTH_ENDPOINT=http://localhost:5500/v
    API_ENDPOINT=http://localhost:3000/v
    SOCKET_ENDPOINT=http://localhost:3003
    ```
5. Install the project's dependencies via npm.
    ```
    $ npm install
    ```
    >**Note**: in case the installation fails due to deprecated dependencies, you might turn it around using `npm install --force`.

6. Create the `.next` directory (required to run the project on development).
    ```
    $ npx next
    ```

7. Run the server on port 3005
    ```
    $ npm run dev
    ```
8. You can log in at http://localhost:3005/login.

## Staging Deployment

> Taken from our official [Deployment SOP](https://docs.google.com/document/d/1u-UKZ3v-YIQVq7Lb5Pv1nRjjoIG_ijqiHEq1qAQNEwM/edit)
1. Notify your colleagues about your intention to upload your branches to **staging** in the #deploy_staging Slack channel.
2. Prepare your **staging** branch in your local environment.
    - Go to your **stable** branch.
      ```
      $ git checkout stable
      ```
    - From **stable**, pull the last origin changes, **rebased**.
      ```
      $ git pull origin stable --rebase
      ```
    - Delete your local **staging** branch.
      ```
      $ git branch -D staging
      ```
    - From **stable**, create a new **staging** branch
      ```
      $ git checkout -b staging
      ```
    >**Note**:
    > - Here both **staging** and **stable** must be identical.
    > - You can check any differences with a `git log` or `git diff`.
    - From your **staging** branch, rebase any development branch you want to test on the server.
      ```
      $ git rebase branch-name-in-development
      ```
    - If someone already has a branch added to **staging** server branch (and mentioned it on Slack), **rebase** those branches as well.
      ```
      $ git rebase branch-name-in-development-by-colleague-1
      $ git rebase branch-name-in-development-by-colleague-2
      .
      .
      .
      $ git rebase branch-name-in-development-by-colleague-n
      ```
      >**Note**:
      > - In case there are conflicts during the rebase, solve them with your colleague and see who should be in charge of solving them.
      > - Usually, it's the last person who gets its branch merged who has to solve the conflicts and include their solution on their branch and respective Pull Request.

3. Once you have rebased all the branches on your local **staging** branch, push forcedly to the origin staging branch.
    ```
    $ git push origin staging -f
    ```
    >**Note**: You have to send it forcedly since you are re-writing the branch.
4. Access the Staging Server.
5. Go to the **Admin** directory.
    ```
    $ cd www/admin
    ```
6. You can run the file `deploy.sh`, or emulate the same steps as follows:
    - Git stash the current changes on the directory.
        ```
        $ git stash
        ```
    - Change to the stable branch to update with the last changes.
        ```
        $ git checkout stable
        ```
    - Delete the server's **staging** branch.
        ```
        $ git branch -D staging
        ```
    - Pull the last origin staging's changes.
        ```
        $ git fetch origin staging
        ```
    - Pop the staged changes on the current staging branch to reincorporate the original server's changes.
        ```
        $ git stash pop
        ```
    - Create the app's **docker image**.
        ```
        $ docker-compose up --build -d app
        ```
    - Delete all the unused images.
        ```
        $ docker image prune --all
        ```
