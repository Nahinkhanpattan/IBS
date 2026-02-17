// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeviceAccess {

    struct Device {
        bool registered;
        mapping(string => bool) permissions;
    }

    mapping(address => Device) private devices;

    event DeviceRegistered(address device);
    event PermissionGranted(address device, string resource);
    event AccessChecked(address device, string resource, bool allowed);

    function registerDevice(address device) public {
        devices[device].registered = true;
        emit DeviceRegistered(device);
    }

    function grantPermission(address device, string memory resource) public {
        require(devices[device].registered, "Device not registered");
        devices[device].permissions[resource] = true;
        emit PermissionGranted(device, resource);
    }

    function checkAccess(address device, string memory resource) public returns(bool) {
        bool allowed = devices[device].registered &&
                       devices[device].permissions[resource];

        emit AccessChecked(device, resource, allowed);
        return allowed;
    }
}
