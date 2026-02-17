import requests
import time
import random

SERVER_URL = "http://localhost:4000/api"

# Generates a random Ethereum-like address for simulation
def generate_address():
    return "0x1111111111111111111111111111111111111111"

def simulate_device():
    device_address = generate_address()
    resource = "temperature_data"
    
    print(f"--- Simulating Device: {device_address} ---")
    
    # 1. Try to register (In real world, admin registers it, but here we simulate flow)
    # Ideally, we should print the address and ask Admin to register it via UI.
    print(f"Device created. Please REGISTER this address via Dashboard: {device_address}")
    
    # Wait for user to register? Or just try to access.
    # Let's try to access immediately to see it fail.
    print("Attempting to access resource without registration/permission...")
    try:
        response = requests.post(f"{SERVER_URL}/access/request", json={
            "deviceAddress": device_address,
            "resource": resource
        })
        print(f"Response: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

    # Now let's try a known test flow if we want to automate it fully.
    # But this script is 'simulated_device', it should act like a dumb device.
    # So it just loops and tries to send data.
    
    while True:
        print("\nSending access request...")
        try:
            response = requests.post(f"{SERVER_URL}/access/request", json={
                "deviceAddress": device_address,
                "resource": resource
            })
            if response.status_code == 200:
                print("ACCESS GRANTED! Sending data...")
            else:
                print("ACCESS DENIED. Waiting for permission...")
        except Exception as e:
            print(f"Connection Error: {e}")
        
        time.sleep(5)

if __name__ == "__main__":
    simulate_device()
