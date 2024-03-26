<template>
<div class="dashboard">
    <div class="box">
        <div class="figure-container">
            <div class="figure">$150</div>
            <button class="figure-btn">Action</button>
        </div>
        <div class="description">
            <p> Current Price </p>
        </div>
        <div class="status up">↑ <span class="status-text">3% up since last week</span></div>
    </div>
    <div class="box">
        <div class="figure-container">
            <div class="figure">$75</div>
            <button class="figure-btn">Action</button>
        </div>
        <div class="description">
            <p> Lowest Price </p>
        </div>
        <div class="status down">↓ <span class="status-text">Since 14 Feb 2023</span></div>
    </div>
    <div class="box">
        <div class="figure-container">
            <div class="figure">$200</div>
            <button class="figure-btn">Action</button>
        </div>
        <div class="description"> 
            <p> Highest Price </p>
        </div>
        <div class="status up">↑ <span class="status-text">Since 14 Feb 2023</span></div>
    </div>
    <div class="box">
        <div class="figure-container">
            <div class="figure">$50</div>
            <button class="figure-btn">Action</button>
        </div>
        <div class="description"> 
            <p> Monthly Views </p>
        </div>
        <div class="status down">↓ <span class="status-text">1.5% up since last week</span></div>
    </div>
</div>

</template>

<script>
export default {

}
</script>

<style scoped> 

.body {
    font-family: Arial, sans-serif;
}

.dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}

.box {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    width: 175px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.figure-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.figure {
    font-size: 24px;
    font-weight: bold;
}

.figure-btn {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.description{
    display: flex;
    font-size: small;
    justify-content: left;
}


.status {
    display: flex;
    flex-direction: row; /* Aligns the arrow beside the text */
    justify-content: left;
    align-items: center;
}

.status-text {
    margin-left: 5px; /* Space between the arrow and the text */
    font-size: small;
    color: black;
}

.status.up {
    color: #4CAF50; /* Green for up */
}

.status.down {
    color: #F44336; /* Red for down */
}

</style>
