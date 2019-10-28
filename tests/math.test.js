const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add}= require('../src/math');

test('calculatetipTest',()=>{
    const total = calculateTip(10, .3);

    expect(total).toBe(13);
    // if(total !==13){
    //     throw new Error("Total tip should be 13 but ",total);
    // }
});

test('calculate tip with default',()=>{
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

test('fahrenheitToCelsius test',()=>{
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0)
})

test('celsiusToFahrenheit test',()=>{
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
})

//callback asynchronous pattern
test('callback',(done)=>{
    setTimeout(()=>{
        expect(2).toBe(2);
        done();
    },2000);
})

//Promise asynchronous pattern
test('addition of two - promise',(done)=>{
    add(12,10).then((sum)=>{
        expect(sum).toBe(22);
        done();
    })
});

//async pattern
test('addition of two number - async', async()=>{
    const sum = await add(12,10);
    expect(sum).toBe(22);
})
// test('testCase1',()=>{
//     //unless we throw errors, it is always passed
// });

// test('testCase2',()=>{
//     throw new Error('failed !!');
// })