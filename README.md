# <div align="center">SLM Assignment</div>

## How to run

To initialize the database, you must start a docker container with the command below.

```bash
docker-compose up
```

After you have initialized the database, you can start the server with the commands below.

```bash
npm install
npm run build
npm run start
```

You can open the `front/index.html` with a browser to test the API.

## Testing

### Preview

![Preview](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/1c63745b-4395-4f33-82c6-6fb930625d5b)

### Choose driver

You can choose which driver packages you want to see by choosing the drivers name from the list as shown below.
![Choose driver](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/6f800f33-ee6f-4885-bfd0-8e18073d7fc3)

![Moe packages](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/46508c7c-be8c-467b-825d-9e820bab2402)

### Scan package

If you want to scan a package you enter its voucher on the input field as shown below.
![Enter voucher](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/b3db10d5-af82-4109-8cad-57e23f06c151)

![State changed](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/4ea70683-6b58-4759-90ff-7dde3f905705)

If you enter a non valid voucher, an alert message will be displayed.

![Non valid voucher](https://github.com/PetrosPapandonopoulos/slm_assigment/assets/51060590/174397a7-6a97-4765-a7aa-ae3ecc519f93)

### Reset states

If you want to reset the status of all the packages to `Not scanned`, you can press the Reset button on the bottom right of the screen.

## Notes

Normally the `.env` wouldn't be included in the git repository since it has the database credentials, but for the purpose of the assignment it was included in order to run the database.
