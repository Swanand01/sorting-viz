import { colorCode } from "./colors.js"

let barsElem = document.querySelector(".bars");

let arraySizeSlider = document.querySelector("#array_size");
let arraySize = parseInt(document.querySelector("#array_size").value);
let array = createNewArray(arraySize);
createBars(array);

let buttons = document.querySelector('.buttons');

let infoTitle = document.querySelector("#info_title");
let infoBody = document.querySelector("#info_body");

arraySizeSlider.addEventListener('input', () => {
    arraySize = parseInt(document.querySelector("#array_size").value);
    array = createNewArray(arraySize);
    createBars(array);
})

let newArrayBtn = document.querySelector("#new_array");
newArrayBtn.addEventListener('click', () => {
    array = createNewArray(arraySize);
    createBars(array);
})

let bubbleSortBtn = document.querySelector("#bubble_sort_btn")
bubbleSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await bubbleSort(array);
    enableInteraction();
})

let selectionSortBtn = document.querySelector("#selection_sort_btn")
selectionSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await selectionSort(array);
    enableInteraction();
})

let insertionSortBtn = document.querySelector("#insertion_sort_btn")
insertionSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await insertionSort(array);
    enableInteraction();
})

let mergeSortBtn = document.querySelector("#merge_sort_btn")
mergeSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await mergeSort(array, 0, array.length - 1);
    enableInteraction();
})

let quickSortBtn = document.querySelector("#quick_sort_btn")
quickSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await quickSort(array, 0, array.length - 1);
    for (let i = 0; i < array.length; i++) {
        document.querySelector(`#index_${i}`).style.borderColor = colorCode.green;
        await delay(1 / parseInt(document.querySelector("#speed").value))
    }
    enableInteraction();
})

let heapSortBtn = document.querySelector("#heap_sort_btn")
heapSortBtn.addEventListener('click', async () => {
    disableInteraction();
    await heapSort(array, array.length - 1)
    enableInteraction();
})

function createNewArray(length) {
    let randomArray = []
    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * (parseInt(barsElem.clientHeight) - 1) + 1));
    }
    return randomArray;
}

function createBars(array) {
    barsElem.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let bar = document.createElement("div");
        bar.id = `index_${index}`;
        bar.classList.add("bar");
        bar.style.height = `${element}px`
        barsElem.appendChild(bar)
    }
}


function disableInteraction() {
    arraySizeSlider.disabled = true;
    for (let i = 0; i < buttons.childElementCount; i++) {
        buttons.children[i].disabled = true;
    }
}

function enableInteraction() {
    arraySizeSlider.disabled = false;
    for (let i = 0; i < buttons.childElementCount; i++) {
        buttons.children[i].disabled = false;
    }
}


function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);

    let tmp_id = obj1.id
    obj1.id = obj2.id
    obj2.id = tmp_id
}

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

function swap(arr, x, y) {
    let z = arr[x];
    arr[x] = arr[y];
    arr[y] = z;
}

async function bubbleSort(array) {
    infoTitle.innerHTML = "Read about Bubble Sort:";
    infoBody.innerHTML = `
    <p>
        Bubble sort is a sorting algorithm that compares two adjacent elements and swaps them until they are in the intended order.
    </p>

    <p>
        Bubble sort checks if array[0] > array[1]. If yes, it swaps array[0] with array[1].
        Then it compares array[1] with array[2] and so on. At the end of every pass, the largest element bubbles up to the end of the array.
    </p>
    
    <p>
        <b><i>Worst and Average Case</i></b> Time Complexity: <b><i>O(n<sup>2</sup>)</i></b>. Worst case occurs when array is reverse sorted.
    </p>

    <p>
        <b><i>Best Case</i></b> Time Complexity: <b><i>O(n)</i></b>. Best case occurs when array is already sorted.
    </p>

    <div class="image-div">
        <img class="image-file" src="https://runestone.academy/runestone/books/published/pythonds/_images/bubblepass.png">
        <p>
            Source: <a href="https://runestone.academy/runestone/books/published/pythonds/SortSearch/TheBubbleSort.html" target="_blank">Runestone academy</a>
        </p>
    </div>
    `
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                barsElem.querySelector(`#index_${j}`).style.borderColor = colorCode.yellow;
                await delay(1 / parseInt(document.querySelector("#speed").value));
                swapElements(barsElem.querySelector(`#index_${j}`), barsElem.querySelector(`#index_${j + 1}`));
                swap(array, j + 1, j);
                await delay(1 / parseInt(document.querySelector("#speed").value));
            }
            barsElem.querySelector(`#index_${j}`).style.borderColor = colorCode.blue
        }
        barsElem.querySelector(`#index_${array.length - 1 - i}`).style.borderColor = colorCode.green;
    }
}

async function selectionSort(array) {
    infoTitle.innerHTML = "Read about Selection Sort:";
    infoBody.innerHTML = `
    <p>    
        Selection sort is an in-place comparison-based algorithm in which the array is divided into two parts, the sorted part at the left end and the unsorted part at the right end. Initially, the sorted part is empty and the unsorted part is the entire list.
    </p>

    <p>
        The smallest element is selected from the unsorted array and swapped with the leftmost element, and that element becomes a part of the sorted array. This process continues moving unsorted array boundary by one element to the right.
    </p>

    <p>
        <b><i>Worst and Average Case</i></b> Time complexity: <b><i>O(n<sup>2</sup>)</i></b>
    </p>

    <p>
        <b><i>Best Case</i></b> Time complexity: <b><i>O(n<sup>2</sup>)</i></b>
    </p>

    <div class="image-div">
        <img class="image-file" src="https://www.w3resource.com/w3r_images/selection-short.png">
        <p>
            Source: <a href="https://www.w3resource.com/php-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-4.php" target="_blank">w3resource</a>
        </p>
    </div>
    `
    for (let i = 0; i < array.length - 1; i++) {
        let iMin = i;

        document.querySelector(`#index_${i}`).style.borderColor = colorCode.yellow;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[iMin]) {
                iMin = j;
                document.querySelector(`#index_${iMin}`).style.borderColor = colorCode.darkBlue;
                await delay(1 / parseInt(document.querySelector("#speed").value));
                document.querySelector(`#index_${iMin}`).style.borderColor = colorCode.blue;
                await delay(1 / parseInt(document.querySelector("#speed").value));
            }
        }
        document.querySelector(`#index_${iMin}`).style.borderColor = colorCode.purple;
        await delay(1 / parseInt(document.querySelector("#speed").value));
        if (iMin != i) {
            swap(array, iMin, i)
            swapElements(barsElem.querySelector(`#index_${iMin}`), barsElem.querySelector(`#index_${i}`));
            document.querySelector(`#index_${iMin}`).style.borderColor = colorCode.blue;
            await delay(1 / parseInt(document.querySelector("#speed").value));
        }
        document.querySelector(`#index_${i}`).style.borderColor = colorCode.green;
    }
}

async function insertionSort(array) {
    infoTitle.innerHTML = "Insertion Sort"
    infoBody.innerHTML = `
    <p>
        Insertion sort works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.
    </p>

    <p>
        To sort an array of size n in ascending order:
    </p>

    <ol>
        <li>
            Iterate from arr[1] to arr[n] over the array. 
        </li>
        <li>
            Compare the current element (key) to its predecessor. 
        </li>
        <li>
            If the key element is smaller than its predecessor, swap and compare it to the elements before. Move the greater elements one position up to make space for the swapped element.
        </li>
    </ol>

    <p>
        <b><i>Worst and Average Case</i></b> Time complexity: <b><i>O(n<sup>2</sup>)</i></b>
    </p>

    <p>
        <b><i>Best Case</i></b> Time complexity: <b><i>O(n)</i></b>
    </p>

    <div class="image-div">
        <img class="image-file" src="https://miro.medium.com/max/773/1*Tyd9a7fjF-zPUTModbU3VA.png">
        <p>
            Source: <a href="https://medium.com/star-gazers/introduction-to-insertion-sort-756821945e3e" target="_blank">Gunavaran Brihadiswaran</a>
        </p>
    </div> 
    `
    barsElem.querySelector("#index_0").style.borderColor = colorCode.green;
    await delay(0.5 / parseInt(document.querySelector("#speed").value));
    for (let i = 1; i < array.length; i++) {
        let element = array[i];
        let j = i - 1;
        while (j >= 0 && element < array[j]) {
            barsElem.querySelector(`#index_${j + 1}`).style.borderColor = colorCode.yellow;
            await delay(0.5 / parseInt(document.querySelector("#speed").value));
            swapElements(barsElem.querySelector(`#index_${j + 1}`), barsElem.querySelector(`#index_${j}`));
            array[j + 1] = array[j];
            j--;
            await delay(0.5 / parseInt(document.querySelector("#speed").value));
        }
        barsElem.querySelector(`#index_${j + 1}`).style.borderColor = colorCode.green;
        array[j + 1] = element;
        await delay(0.5 / parseInt(document.querySelector("#speed").value));
    }
}

async function merge(arr, l, m, h) {
    let i = l;
    let j = m + 1;
    let k = 0;

    let temp = [];
    let auxArray = [];

    // color the partitions
    for (let i = l; i <= m; i++)
        document.querySelector(`#index_${i}`).style.borderColor = colorCode.orange;

    for (let i = m + 1; i <= h; i++)
        document.querySelector(`#index_${i}`).style.borderColor = colorCode.yellow;

    await delay(1 / parseInt(document.querySelector("#speed").value));

    for (let i = 0; i < arr.length; i++) {
        auxArray[i] = arr[i];
    }


    while (i <= m && j <= h) {

        if (arr[i] <= arr[j]) {
            document.querySelector(`#index_${l + k}`).style.height = `${auxArray[i]}px`;
            document.querySelector(`#index_${l + k}`).style.borderColor = colorCode.green;
            await delay(1 / parseInt(document.querySelector("#speed").value));
            temp[k++] = arr[i++];
        }
        else {
            document.querySelector(`#index_${l + k}`).style.height = `${auxArray[j]}px`;
            document.querySelector(`#index_${l + k}`).style.borderColor = colorCode.green;
            await delay(1 / parseInt(document.querySelector("#speed").value));
            temp[k++] = arr[j++];
        }
    }

    while (i <= m) {
        document.querySelector(`#index_${l + k}`).style.height = `${auxArray[i]}px`;
        document.querySelector(`#index_${l + k}`).style.borderColor = colorCode.green;
        await delay(1 / parseInt(document.querySelector("#speed").value));
        temp[k++] = arr[i++];
    }

    while (j <= h) {
        document.querySelector(`#index_${l + k}`).style.height = `${auxArray[j]}px`;
        document.querySelector(`#index_${l + k}`).style.borderColor = colorCode.green;
        await delay(1 / parseInt(document.querySelector("#speed").value));
        temp[k++] = arr[j++];
    }

    for (let i = l, k = 0; i <= h; i++, k++)
        arr[i] = temp[k];
}

async function mergeSort(arr, l, h) {
    infoTitle.innerHTML = "Merge Sort";
    infoBody.innerHTML = `
    <p>
    Merge sort uses the divide and conquer approach to sort the elements. It divides the given array into two equal halves, calls itself for the two halves and then merges the two sorted halves.
    </p>

    <p>
    The sub-arrays are divided again and again into halves until the list cannot be divided further. 
    </p>
    
    <p>
    <b><i>Worst and Average Case</i></b> Time complexity: <b><i>O(nlog(n))</i></b>
    </p>

    <p>
    <b><i>Best Case</i></b> Time complexity: <b><i>O(nlog(n))</i></b>
    </p>

    <div class="image-div">
        <img class="image-file" src="https://s3-us-west-2.amazonaws.com/tutorials-image/merge+sort+working.png">
        <p>
            Source: <a href="https://www.interviewbit.com/tutorial/merge-sort-algorithm/" target="_blank">Interview Bit</a>
        </p>
        <p>
            These sub-arrays are now re-combined, sorting them in the process.
        </p>
    </div>

    <div class="image-div">
        <img class="image-file" src="
        https://s3-us-west-2.amazonaws.com/tutorials-image/merging+of+two+lists.png">
        <p>
            Source: <a href="https://www.interviewbit.com/tutorial/merge-sort-algorithm/" target="_blank">Interview Bit</a>
        </p>
    </div>

    <p>
        The merge algorithm maintains three pointers, one for each of the two arrays and one for maintaining the current index of the final sorted array.
    </p>
    <div class="code">
    <pre>
    <code>
    Have we reached the end of any of the arrays?
    No:
        Compare current elements of both arrays 
        Copy smaller element into sorted array
        Move pointer of element containing smaller element
    Yes:
        Copy all remaining elements of non-empty array
    </code>
    </pre>
    </div>

    <div class="image-div">
    <img class="image-file" src="https://cdn.programiz.com/cdn/farfuture/QgWYSTEJPw6dD8z1dlTcZI-SBWqa8UhVJWvleCsiFA0/mtime:1586425928/sites/tutorial2program/files/merge-two-sorted-arrays.png">
    <p>
    Source: <a href="https://www.programiz.com/dsa/merge-sort" target="_blank">Programiz</a>
    </p>
    </div>
    `
    if (l >= h)
        return;
    let m = Math.floor((l + h) / 2);

    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, h);

    await merge(arr, l, m, h);
}

async function partition(arr, l, h) {
    let pivot = l;
    let i = l + 1;
    document.querySelector(`#index_${pivot}`).style.borderColor = colorCode.red;
    for (let j = i; j <= h; j++) {
        if (arr[j] <= arr[pivot]) {
            swapElements(document.querySelector(`#index_${j}`), document.querySelector(`#index_${i}`));

            document.querySelector(`#index_${j}`).style.borderColor = colorCode.darkBlue;
            document.querySelector(`#index_${i}`).style.borderColor = colorCode.purple;
            await delay(1 / parseInt(document.querySelector("#speed").value));
            document.querySelector(`#index_${i}`).style.borderColor = colorCode.yellow;
            document.querySelector(`#index_${j}`).style.borderColor = colorCode.blue;
            swap(arr, j, i);
            await delay(1 / parseInt(document.querySelector("#speed").value));
            i++;
        }
    }
    swapElements(document.querySelector(`#index_${pivot}`), document.querySelector(`#index_${i - 1}`));
    swap(arr, pivot, i - 1);
    await delay(1 / parseInt(document.querySelector("#speed").value));
    document.querySelector(`#index_${i - 1}`).style.borderColor = colorCode.green;
    for (let j = l; j < i - 1; j++)
        document.querySelector(`#index_${j}`).style.borderColor = colorCode.blue;
    return i - 1;
}

async function quickSort(arr, l, h) {
    if (l >= h)
        return

    let p = await partition(arr, l, h);

    await quickSort(arr, l, p - 1);
    await quickSort(arr, p + 1, h);
}

function leftChild(arr, i, h) {
    if (2 * (i + 1) <= h + 1)
        return 2 * (i + 1) - 1;
    return -1;
}

function rightChild(arr, i, h) {
    if (2 * (i + 1) + 1 <= h + 1)
        return 2 * (i + 1);
    return -1;
}

async function maxHeapify(arr, l, h) {
    for (let root = h; root >= l; root--) {
        if (leftChild(arr, root, h) != -1) {
            let lc = leftChild(arr, root, h);
            let rc = rightChild(arr, root, h);

            let max = lc;

            if (rc != -1) {
                if (arr[lc] < arr[rc])
                    max = rc;
            }

            if (arr[root] < arr[max]) {
                document.querySelector(`#index_${root}`).style.borderColor = colorCode.orange;
                document.querySelector(`#index_${max}`).style.borderColor = colorCode.yellow;
                await delay(0.5 / parseInt(document.querySelector("#speed").value));
                swapElements(barsElem.querySelector(`#index_${root}`), barsElem.querySelector(`#index_${max}`));
                document.querySelector(`#index_${root}`).style.borderColor = colorCode.blue;
                document.querySelector(`#index_${max}`).style.borderColor = colorCode.blue;
                swap(arr, root, max);
                await maxHeapify(arr, max, h);
            }
        }
    }
}

async function heapSort(arr, h) {
    while (h > 0) {
        await maxHeapify(arr, 0, h);
        await delay(0.5 / parseInt(document.querySelector("#speed").value));
        swapElements(barsElem.querySelector(`#index_${0}`), barsElem.querySelector(`#index_${h}`));
        document.querySelector(`#index_${h}`).style.borderColor = colorCode.green;
        swap(arr, 0, h);
        h--;
    }
    document.querySelector(`#index_${0}`).style.borderColor = colorCode.green;
}