import requests

SERVER_URL = "http://localhost:4000/api"
DEVICE_ADDRESS = "0x1111111111111111111111111111111111111111"
RESOURCE = "temperature_data"

def register_and_grant():
    print(f"Registering device: {DEVICE_ADDRESS}")
    try:
        res = requests.post(f"{SERVER_URL}/devices/register", json={"deviceAddress": DEVICE_ADDRESS})
        print(f"Register Response: {res.status_code} - {res.json()}")
    except Exception as e:
        print(f"Register Error: {e}")

    print(f"Granting permission for: {RESOURCE}")
    try:
        res = requests.post(f"{SERVER_URL}/devices/grant", json={"deviceAddress": DEVICE_ADDRESS, "resource": RESOURCE})
        print(f"Grant Response: {res.status_code} - {res.json()}")
    except Exception as e:
        print(f"Grant Error: {e}")

if __name__ == "__main__":
    register_and_grant()
