// 并发请求 1
function sendRequest(requestList, limits, callback) {
  const promises = requestList.slice(); // 取得请求list（浅拷贝一份）
  // 得到开始时，能执行的并发数
  const concurrentNum = Math.min(limits, requestList.length);
  let concurrentCount = 0; // 当前并发数
  // 第一次先跑起可以并发的任务
  const runTaskNeeded = () => {
    let i = 0;
    // 启动当前能执行的任务
    while (i < concurrentNum) {
      i++;
      runTask();
    }
  };
  // 取出任务并且执行任务
  const runTask = () => {
    const task = promises.shift();
    task && runner(task);
  };
  // 执行器
  // 执行任务，同时更新当前并发数
  const runner = async (task) => {
    try {
      concurrentCount++;
      await task();
    } catch (error) {
    } finally {
      // 并发数--
      concurrentCount--;
      // 捞起下一个任务
      picker();
    }
  };
  // 捞起下一个任务
  const picker = () => {
    // 任务队列里还有任务并且此时还有剩余并发数的时候 执行
    if (concurrentCount < limits && promises.length > 0) {
      // 继续执行任务
      runTask();
      // 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
    } else if (promises.length == 0 && concurrentCount == 0) {
      // 执行结束
      callback && callback();
    }
  };
  // 入口执行
  runTaskNeeded();
}

async function sendRequestRace(requestList, limits, callback) {
  // 维护一个promise队列
  const promises = [];
  // 当前的并发池,用Set结构方便删除
  const pool = new Set(); // set也是Iterable<any>[]类型，因此可以放入到race里
  // 开始并发执行所有的任务
  for (let request of requestList) {
    // 开始执行前，先await 判断 当前的并发任务是否超过限制
    if (pool.size >= limits) {
      // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
      await Promise.race(pool).catch((err) => err);
    }
    const promise = request(); // 拿到promise
    // 删除请求结束后，从pool里面移除
    const cb = () => {
      pool.delete(promise);
    };
    // 注册下then的任务
    promise.then(cb, cb);
    pool.add(promise);
    promises.push(promise);
  }
  // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
  // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)
  Promise.allSettled(promises).then(callback, callback);
}

function concurrentRequest(urls, maxConcurrent, callback) {
  const results = [];
  let currentIndex = 0;
  let activeRequests = 0;
  function makeRequest(url, index) {
    activeRequests++;
    // 发起请求
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        results[index] = data;
        activeRequests--;
        checkComplete();
      })
      .catch((error) => console.error(`Request failed: ${error}`));
  }
  function checkComplete() {
    while (activeRequests < maxConcurrent && currentIndex < urls.length) {
      makeRequest(urls[currentIndex], currentIndex);
      currentIndex++;
    }
    if (activeRequests === 0 && currentIndex === urls.length) {
      callback(results);
    }
  }
  checkComplete();
}

// Promise.all实现并发请求
function handleConcurrentRequests(requests) {
  // 创建一个Promise数组，用于存储每个请求的Promise对象
  const promiseArray = requests.map((request) => request());
  // 使用Promise.all()方法等待所有请求完成
  return Promise.all(promiseArray);
}
// const requests = [request1, request2, request3];
// handleConcurrentRequests(requests)
//   .then((results) => {
//     console.log("所有请求都已完成", results);
//   })
//   .catch((error) => {
//     console.error("至少一个请求失败", error);
//   });
