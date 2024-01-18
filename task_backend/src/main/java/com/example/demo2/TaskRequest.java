package com.example.demo2;

class TaskRequest {
    private String token;
    private Task2 task;

    // Constructors

    public TaskRequest() {
    }

    public TaskRequest(String token, Task2 task) {
        this.token = token;
        this.task = task;
    }

    // Getters and Setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Task2 getTask() {
        return task;
    }

    public void setTask(Task2 task) {
        this.task = task;
    }
}