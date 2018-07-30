Note Server
===========

Upon running the service api-doc is available at http://127.0.0.1:3000/api-docs/.

The path to the Git repository should be defined as GIT_REPO_PATH environment variable.

Before running the service you need to convert swagger.yaml to swagger.json. You can do this by running the following command:

```
 yaml2json swagger.yaml -p -i4 > swagger.json
```
