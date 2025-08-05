package com.apnacart.entity;

public enum OrderStatus {
    NEW, //only placed, not processed
    PAID, // payment done, waiting for shipment
    SHIPPED, // order in transit
    DELIVERED, //order delivered
    CANCELLED //order cancelled by the user
}//OrderStatus ends
