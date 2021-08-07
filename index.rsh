"reach 0.1";
export const main = Reach.App(() => {
    //interface Alice
    const A = Participant("Alice", {
        request: UInt,
        info: Bytes(128),
    });

    //interface Bob
    const B = Participant("Bob", {
        want: Fun([UInt], Null),
        got: Fun([Bytes(128)], Null),
    });

    deploy();

    A.only(() => {
        //declare request
        const request = declassify(interact.request);
    })
    A.publish(request);
    commit();

    //Bob want to info then access or not request of Alice
    B.only(() => {
        interact.want(request)
    });
    // if access pay coin 
    B.pay(request);
    commit();

    A.only(() => {
        const info = declassify(interact.info);
    });
    A.publish(info);
    //Alice send request to Bob
    transfer(request).to(A);
    commit();

    B.only(() => {
        interact.got(info);
    });
    exit();
});