import express from 'express';
import fs from 'fs';
import {prisma} from "./db";
import z from "zod";
import { CreateAvatarSchema, SignUpSchema } from './types';
import bcrypt from "bcrypt";
import axios from "axios";
import { GoogleGenAI } from '@google/genai/node';
import {uuid} from "uuidv4";
import { createImage } from './image';

const app = express();

app.post("/api/v1/signup", async (req, res) => {
    try {
    const {success, data} = SignUpSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Invalid credentials",
        })
    }

    const existingUser = await prisma.user.findUnique({
        where : {
            username: data.username,
        }
    })
    if(existingUser) {
        return res.status(409).json({
            message: "User already exists",
        })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            username: data.username,
            password: hashedPassword,
        }
    })

    return res.status(201).json({
    id: user.id,
    message: "User created successfully",
});
}
catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Internal server error",
    })
}
})

app.post("/api/v1/signin", (req, res) => {
    
})

app.post("/api/v1/avatar", async (req, res) => {
    const {success, data} = CreateAvatarSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Invalid data",
        })
    }
    
    const leftProfileId = uuid();
    const rightProfileId = uuid();
    const frontProfileId = uuid();

    await Promise.all([
     createImage("Create a side profile for the user for the left side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${leftProfileId}.png`),
     createImage("Create a side profile for the user for the right side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${rightProfileId}.png`),
     createImage("Create a front profile for the user. It should be a high quality portfolio shoot type photo", data.image, `./assets/${frontProfileId}.png`),
   ])

   //put in s3 and then put in db



})

app.post("/api/v1/video", (req, res) => {
    
})

app.get("/api/v1/video/:videoId", (req, res) => {
    
})

app.get("/api/v1/videos", (req, res) => {
    
})

app.get("/api/v1/models", (req, res) => {
    
})

app.post("/api/v1/profile", (req, res) => {
    
})
app.get("/api/v1/avatar/:avatarId", (req, res) => {
    
})

app.get("/api/v1/avatars", (req, res) => {
    
})