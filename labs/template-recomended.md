---
level: Advanced [Foundational | Intermediate | Advanced]
tags: tech, coding, react [comma separated words]
status: Published [Published | Draft]
---

# Title [only one title per Lab]

## Overview

Explanation of what is going to be achieved, what are the prerequisites and important notes.

[any markdown]

### Context

Context of the problem.

[any markdown]

### Problem

What are we trying to solve?

### Solution

How are we going to solve the problem?

### Prerequisites

- Access
- Tools
- Other labs
- Prior knowledge

### Important

Any important notes

## Step 1 [0 to N Steps]

The actual steps to achieve the goal of the lab. Feel free to use the full potential of markdown.

### Step 1.1 [0 to N Sub Steps]

A sub step, the index will show up to this level only

```js
const crypto = require("crypto");

function hash7(string) {
  const hash = crypto.createHash("sha256");
  hash.update(string);
  return hash.digest("hex").substring(0, 7);
}
```

## Step 2

The actual steps to achieve the goal of the lab. Feel free to use the full potential of markdown.

### Step 2.1

A sub step, the index will show up to this level only

### Step 2.2

## Step 3

A sub step, the index will show up to this level only

### Step 3.1

A sub step, the index will show up to this level only

### Step 3.2

A sub step, the index will show up to this level only

### Step 3.3

A sub step, the index will show up to this level only

## Verify

Steps to verify the solution.

## Cleanup

Steps to cleanup all live resources, like deployments and aws resources.

## Summary

A recap what has been achieved and next steps.

### Resources

links to external resources

- [one](one)
- [two](two)
- [three](three)

### Next Steps

- Other labs
- Documentation
