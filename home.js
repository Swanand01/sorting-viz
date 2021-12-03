barsElem = document.querySelector(".bars");

let arraySizeSlider = document.querySelector("#array_size");
let arraySize = parseInt(document.querySelector("#array_size").value);
let array = createNewArray(arraySize);
createBars(array);

let buttons = document.querySelector('.buttons');

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
        document.querySelector(`#index_${i}`).style.borderColor = " lightgreen"
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

async function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                barsElem.querySelector(`#index_${j}`).style.borderColor = "blue";
                await delay(1 / parseInt(document.querySelector("#speed").value));
                swapElements(barsElem.querySelector(`#index_${j}`), barsElem.querySelector(`#index_${j + 1}`));
                swap(array, j + 1, j);
                await delay(1 / parseInt(document.querySelector("#speed").value));
            }
            barsElem.querySelector(`#index_${j}`).style.borderColor = "black"
        }
        barsElem.querySelector(`#index_${array.length - 1 - i}`).style.borderColor = "green";
    }
}

async function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let iMin = i;

        document.querySelector(`#index_${i}`).style.borderColor = "yellow";
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[iMin]) {
                iMin = j;
                document.querySelector(`#index_${iMin}`).style.borderColor = "blue";
                await delay(1 / parseInt(document.querySelector("#speed").value));
                document.querySelector(`#index_${iMin}`).style.borderColor = "black";
                await delay(1 / parseInt(document.querySelector("#speed").value));
            }
        }
        document.querySelector(`#index_${iMin}`).style.borderColor = "purple";
        await delay(1 / parseInt(document.querySelector("#speed").value));
        if (iMin != i) {
            swap(array, iMin, i)
            swapElements(barsElem.querySelector(`#index_${iMin}`), barsElem.querySelector(`#index_${i}`));
            document.querySelector(`#index_${iMin}`).style.borderColor = "black";
            await delay(1 / parseInt(document.querySelector("#speed").value));
        }
        document.querySelector(`#index_${i}`).style.borderColor = "green"
    }
}

async function insertionSort(array) {
    barsElem.querySelector("#index_0").style.borderColor = "green";
    await delay(0.5 / parseInt(document.querySelector("#speed").value));
    for (let i = 1; i < array.length; i++) {
        let element = array[i];
        let j = i - 1;
        while (j >= 0 && element < array[j]) {
            barsElem.querySelector(`#index_${j + 1}`).style.borderColor = "yellow";
            await delay(0.5 / parseInt(document.querySelector("#speed").value));
            swapElements(barsElem.querySelector(`#index_${j + 1}`), barsElem.querySelector(`#index_${j}`));
            array[j + 1] = array[j];
            j--;
            await delay(0.5 / parseInt(document.querySelector("#speed").value));
        }
        barsElem.querySelector(`#index_${j + 1}`).style.borderColor = "green";
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
        document.querySelector(`#index_${i}`).style.borderColor = "orange";

    for (let i = m + 1; i <= h; i++)
        document.querySelector(`#index_${i}`).style.borderColor = "yellow";

    await delay(1 / parseInt(document.querySelector("#speed").value));

    for (let i = 0; i < arr.length; i++) {
        auxArray[i] = arr[i];
    }


    while (i <= m && j <= h) {

        if (arr[i] <= arr[j]) {
            document.querySelector(`#index_${l + k}`).style.height = `${auxArray[i] * 4}px`;
            document.querySelector(`#index_${l + k}`).style.borderColor = "lightgreen";
            await delay(1 / parseInt(document.querySelector("#speed").value));
            temp[k++] = arr[i++];
        }
        else {
            document.querySelector(`#index_${l + k}`).style.height = `${auxArray[j] * 4}px`;
            document.querySelector(`#index_${l + k}`).style.borderColor = "lightgreen";
            await delay(1 / parseInt(document.querySelector("#speed").value));
            temp[k++] = arr[j++];
        }
    }

    while (i <= m) {
        document.querySelector(`#index_${l + k}`).style.height = `${auxArray[i] * 4}px`;
        document.querySelector(`#index_${l + k}`).style.borderColor = "lightgreen";
        await delay(1 / parseInt(document.querySelector("#speed").value));
        temp[k++] = arr[i++];
    }

    while (j <= h) {
        document.querySelector(`#index_${l + k}`).style.height = `${auxArray[j] * 4}px`;
        document.querySelector(`#index_${l + k}`).style.borderColor = "lightgreen";
        await delay(1 / parseInt(document.querySelector("#speed").value));
        temp[k++] = arr[j++];
    }

    for (let i = l, k = 0; i <= h; i++, k++)
        arr[i] = temp[k];
}

async function mergeSort(arr, l, h) {
    if (l >= h)
        return;
    let m = Math.floor((l + h) / 2);

    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, h);

    await merge(arr, l, m, h);
}


function swap(arr, x, y) {
    let z = arr[x];
    arr[x] = arr[y];
    arr[y] = z;
}

async function partition(arr, l, h) {
    let pivot = l;
    let i = l + 1;
    document.querySelector(`#index_${pivot}`).style.borderColor = " red"
    for (let j = i; j <= h; j++) {
        if (arr[j] <= arr[pivot]) {
            swapElements(document.querySelector(`#index_${j}`), document.querySelector(`#index_${i}`));

            document.querySelector(`#index_${j}`).style.borderColor = "aqua";
            document.querySelector(`#index_${i}`).style.borderColor = "coral";
            await delay(1 / parseInt(document.querySelector("#speed").value));
            document.querySelector(`#index_${i}`).style.borderColor = "yellow";
            document.querySelector(`#index_${j}`).style.borderColor = "black";
            swap(arr, j, i);
            await delay(1 / parseInt(document.querySelector("#speed").value));
            i++;
        }
    }
    swapElements(document.querySelector(`#index_${pivot}`), document.querySelector(`#index_${i - 1}`));
    swap(arr, pivot, i - 1);
    await delay(1 / parseInt(document.querySelector("#speed").value));
    document.querySelector(`#index_${i - 1}`).style.borderColor = "lightgreen";
    for (let j = l; j < i - 1; j++)
        document.querySelector(`#index_${j}`).style.borderColor = "black";
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
                document.querySelector(`#index_${root}`).style.borderColor = "orange";
                document.querySelector(`#index_${max}`).style.borderColor = "yellow";
                await delay(0.5 / parseInt(document.querySelector("#speed").value));
                swapElements(barsElem.querySelector(`#index_${root}`), barsElem.querySelector(`#index_${max}`));
                document.querySelector(`#index_${root}`).style.borderColor = "black";
                document.querySelector(`#index_${max}`).style.borderColor = "black";
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
        document.querySelector(`#index_${h}`).style.borderColor = "lightgreen";
        swap(arr, 0, h);
        h--;
    }
    document.querySelector(`#index_${0}`).style.borderColor = "lightgreen";
}