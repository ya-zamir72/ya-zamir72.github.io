window.onload = function () {

    document.querySelector('.js-run').addEventListener('click', event => {
        const paramA = parseFloat(document.querySelector('#paramA').value);
        const paramB = parseFloat(document.querySelector('#paramB').value);
        const paramN = parseFloat(document.querySelector('#paramN').value);
        const paramL = parseFloat(document.querySelector('#paramL').value);
        const paramS = parseFloat(document.querySelector('#paramS').value);
        const paramK = parseFloat(document.querySelector('#paramK').value);
        const paramAType = document.querySelector('.js-paramSelectorA li a.active').id;
        const paramBType = document.querySelector('.js-paramSelectorB li a.active').id;
        const paramSType = document.querySelector('.js-paramSelectorS li a.active').id;
        let check = false;


        if (isNaN(paramA)) { document.querySelector('#paramA').classList.add('error-input'); check = true; } else document.querySelector('#paramA').closest('div').classList.remove('error-input');
        if (isNaN(paramB)) { document.querySelector('#paramB').classList.add('error-input'); check = true; } else document.querySelector('#paramB').closest('div').classList.remove('error-input');
        if (isNaN(paramL)) { document.querySelector('#paramL').classList.add('error-input'); check = true; } else document.querySelector('#paramL').closest('div').classList.remove('error-input');
        if (isNaN(paramK)) { document.querySelector('#paramK').classList.add('error-input'); check = true; } else document.querySelector('#paramK').closest('div').classList.remove('error-input');

        let pqMethod = new PQMethod(paramN, paramK, paramS, paramL);

        switch (paramSType) {
            case 'selectParamSConst':
                if (isNaN(paramN)) { document.querySelector('#paramN').classList.add('error-input'); check = true; } else document.querySelector('#paramN').closest('div').classList.remove('error-input');
                if (isNaN(paramS)) { document.querySelector('#paramS').classList.add('error-input'); check = true; } else document.querySelector('#paramS').closest('div').classList.remove('error-input');
                break;
            case 'selectParamSFunc':
                const paramSc = parseFloat(document.querySelector('#paramSc').value);
                const paramSp = parseFloat(document.querySelector('#paramSp').value);
                if (isNaN(paramSc)) { document.querySelector('#paramSc').classList.add('error-input'); check = true; } else document.querySelector('#paramSc').closest('div').classList.remove('error-input');
                if (isNaN(paramSp)) { document.querySelector('#paramSp').classList.add('error-input'); check = true; } else document.querySelector('#paramSp').closest('div').classList.remove('error-input');
                pqMethod.Sc = paramSc;
                pqMethod.Sp = paramSp;
                break;
        }


        switch (paramAType) {
            case 'selectParamTa':
                pqMethod.Ta = paramA;
                break;
            case 'selectParamQa':
                pqMethod.qa = paramA;
                break;
            case 'selectParamTinfA':
                pqMethod.TinfA = paramA;
                const paramH = parseFloat(document.querySelector('#paramH').value);
                if (isNaN(paramH)) { document.querySelector('#paramH').classList.add('error-input'); check = true; } else document.querySelector('#paramH').closest('div').classList.remove('error-input');
                pqMethod.h = paramH;
                break;
        }

        switch (paramBType) {
            case 'selectParamTb':
                pqMethod.Tb = paramB;
                break;
            case 'selectParamQb':
                pqMethod.qb = paramB;
                break;
            case 'selectParamTinfB':
                pqMethod.TinfB = paramB;
                const paramH = parseFloat(document.querySelector('#paramH').value);
                if (isNaN(paramH)) { document.querySelector('#paramH').classList.add('error-input'); check = true; } else document.querySelector('#paramH').closest('div').classList.remove('error-input');
                pqMethod.h = paramH;
                break;
        }

        if (check) {
            return;
        }

        pqMethod.Solved();

        console.log(pqMethod.a);
        console.log(pqMethod.b);
        console.log(pqMethod.c);
        console.log(pqMethod.d);

        const matrixTOut = document.querySelector('#matrixT');
        const desc1 = document.querySelector('#desc1');
        const desc2 = document.querySelector('#desc2');
        const desc3 = document.querySelector('#desc3');
        const matrixPQOut = document.querySelector('#matrixPQ');
        const answerT = document.querySelector('#answerT');
        matrixTOut.innerHTML = '';
        desc1.innerHTML = '';
        matrixPQOut.innerHTML = '';
        answerT.innerHTML = '';

        let stDesc = '';

        stDesc += '<p>Запишем систему для нахождения значений T<sub>i</sub>. ';
        if (paramBType === 'selectParamTb') {
            stDesc += 'Увидим, что T<sub>1</sub> и T<sub>'+pqMethod.T.length+'</sub> изначально известны. ';
        } else {
            stDesc += 'Увидим, что T<sub>1</sub> изначально известно. ';
        }
        stDesc += 'Распишем уравнения с T<sub>2</sub> по T<sub>'+(pqMethod.T.length-1)+'</sub> по формуле</p>' +
            '<div class="formula"><span>a<sub>i</sub>T<sub>i</sub> = b<sub>i</sub>T<sub>i+1</sub> + c<sub>i</sub>T<sub>i-1</sub> + d<sub>i</sub>, i = 2..'+(pqMethod.T.length - 1)+',</span></div>' +
            '<div class="formula formula--space"><div class="formula--desc">где <span>a<sub>i</sub></span> = <div class="param__calc"><div class="param__numb">2k</div><div class="param__denom">dx</div></div>,</div><div class="formula--desc"><span>b<sub>i</sub></span> = <div class="param__calc"><div class="param__numb">k</div><div class="param__denom">dx</div></div>,</div><div class="formula--desc"><span>c<sub>i</sub></span> = <div class="param__calc"><div class="param__numb">k</div><div class="param__denom">dx</div></div>,</div><div class="formula--desc"><span>d<sub>i</sub></span> = Sdx</div></div>'

        switch (paramBType) {
            case 'selectParamQb':
                stDesc += '<p>Также распишем формулу для нахождения T<sub>'+pqMethod.T.length+'</sub> из соотношения</p> <div class="formula formula--space"><div class="formula--desc">-k <div class="param__calc"><div class="param__numb"><span>T<sub>n</sub></span> - <span>T<sub>n-1</sub></span></div><div class="param__denom">dx</div></div> + S <div class="param__calc"><div class="param__numb">dx</div><div class="param__denom">2</div></div> = q</div></div>' ;
                break;
            case 'selectParamTinf':
                stDesc += '<p>Также распишем формулу для нахождения T<sub>'+pqMethod.T.length+'</sub> из соотношения</p> <div class="formula formula--space"><div class="formula--desc">-k <div class="param__calc"><div class="param__numb"><span>T<sub>n</sub></span> - <span>T<sub>n-1</sub></span></div><div class="param__denom">dx</div></div> + S <div class="param__calc"><div class="param__numb">dx</div><div class="param__denom">2</div></div> = h(<span>T<sub>n</sub></span> - <span>T<sub>∞</sub></span>)</div></div>' ;
                break;
        }

        stDesc += '<p>Запишем полученную систему</p>';

        desc1.innerHTML = stDesc;

        let st;
        for (let i = 0; i < pqMethod.a.length; i++) {
            st = '';
            st += '<div>';
            st += pqMethod.a[i] === 1 ? 'T<sub>'+(i+1)+'</sub>' : round2(pqMethod.a[i])+'T<sub>'+(i+1)+'</sub>';
            st += ' = ';

            st += pqMethod.b[i] === 0 ? '' : pqMethod.b[i] === 1 ? 'T<sub>'+(i+2)+'</sub>' : round2(pqMethod.b[i]) + 'T<sub>'+(i+2)+'</sub>'
            st += pqMethod.c[i] === 0 ? '' :
                pqMethod.c[i] > 0 ?
                    (pqMethod.b[i] === 0) ? 'T<sub>'+i+'</sub>' : (pqMethod.c[i] === 1) ? ' + T<sub>'+i+'</sub>' : ' + ' + round2(pqMethod.c[i]) + 'T<sub>'+i+'</sub>' :
                    (pqMethod.b[i] === 0) ? 'T<sub>'+i+'</sub>' : (pqMethod.c[i] === 1) ? ' - T<sub>'+i+'</sub>' : ' - ' + round2(Math.abs(pqMethod.c[i])) + 'T<sub>'+i+'</sub>';
            st += pqMethod.d[i] === 0 ?
                (pqMethod.b[i] === 0 && pqMethod.c[i] === 0) ? '0' : '' :
                pqMethod.d[i] > 0 ?
                    (pqMethod.b[i] === 0 && pqMethod.c[i] === 0) ? round2(pqMethod.d[i]) : ' + ' + round2(pqMethod.d[i]) :
                    (pqMethod.b[i] === 0 && pqMethod.c[i] === 0) ? round2(pqMethod.d[i]) : ' - ' + round2(Math.abs(pqMethod.d[i]));
            st += '</div>';
            matrixTOut.innerHTML += st;
        }

        stDesc = 'Найдем значение <span>P<sub>i</sub></span> и <span>Q<sub>i</sub></span> по формулам <div class="formula formula--space"><div class="formula--desc"><span>P<sub>1</sub></span> = <div class="param__calc"><div class="param__numb"><span>b<sub>1</sub></span></div><div class="param__denom"><span>a<sub>1</sub></span></div></div>,</div><div class="formula--desc"><span>Q<sub>1</sub></span> = <div class="param__calc"><div class="param__numb"><span>d<sub>1</sub></span></div><div class="param__denom"><span>a<sub>1</sub></span></div></div>,</div><div class="formula--desc"><span>P<sub>i</sub></span> = <div class="param__calc"><div class="param__numb"><span>b<sub>i</sub></span></div><div class="param__denom"><span>a<sub>i</sub></span> - <span>c<sub>i</sub><span>P<sub>i-1</sub></span></span></div></div>,</div><div class="formula--desc"><span>Q<sub>i</sub></span> = <div class="param__calc"><div class="param__numb"><span>c<sub>i</sub></span><span>Q<sub>i-1</sub></span> + <span>d<sub>i</sub></span></div><div class="param__denom"><span>a<sub>i</sub></span> - <span>c<sub>i</sub><span>P<sub>i-1</sub></span></span></div></div></div></div>';
        desc2.innerHTML = stDesc;

        let upperP, upperQ, sub;
        for (let i = 0; i < pqMethod.P.length; i++) {
            st = '';
            upperP = round2(pqMethod.b[i]);
            upperQ = i === 0 ? round2(pqMethod.d[i]) : round2(pqMethod.c[i]) + ' * ' + round2(pqMethod.Q[i-1]) + ' + ' + round2(pqMethod.d[i]);
            sub = i === 0 ? round2(pqMethod.a[i]) : round2(pqMethod.a[i]) + ' - ' + round2(pqMethod.c[i]) + ' * ' + round2(pqMethod.P[i-1]);

            st += '<div class="param"><div class="param__element">';
            st += '<div class="param__name"> P<sub>'+(i+1)+'</sub></div> = <div class="param__calc"><div class="param__numb">'+upperP+'</div><div class="param__denom">'+sub+'</div></div> = ' + round2(pqMethod.P[i]);
            st += '</div><div class="param__element">';
            st += '<div class="param__name"> Q<sub>'+(i+1)+'</sub></div> = <div class="param__calc"><div class="param__numb">'+upperQ+'</div><div class="param__denom">'+sub+'</div></div> = ' + round2(pqMethod.Q[i]);
            st += '</div></div>';
            matrixPQOut.innerHTML += st;
        }

        stDesc = 'Теперь найдем значения <span>T<sub>i</sub></span> по формуле<div class="formula formula--space"><div class="formula--desc"><span>T<sub>i-1</sub></span> =  <div style="margin-left: 7px">P<sub>i-1</sub></div><div style="margin-right: 7px">T<sub>i</sub></div> + <span>Q<sub>i-1</sub></span></div></div>';
        desc3.innerHTML = stDesc;

        for (let i = pqMethod.T.length - 1; i >= 0; i--) {
            st = '';
            st += '<div>';
            st += (i === (pqMethod.T.length - 1)) ?
                'T<sub>'+(i+1)+'</sub> = ' + pqMethod.T[i] :
                (pqMethod.T[i+1] >= 0) ?
                    'T<sub>'+(i+1)+'</sub> = ' + round2(pqMethod.P[i]) + ' * ' + pqMethod.T[i+1] + ' + ' + round2(pqMethod.Q[i]) + ' = ' + pqMethod.T[i] :
                    'T<sub>'+(i+1)+'</sub> = ' + round2(pqMethod.P[i]) + ' * (' + pqMethod.T[i+1] + ') + ' + round2(pqMethod.Q[i]) + ' = ' + pqMethod.T[i];
            st += '</div>';
            answerT.innerHTML += st;
        }
    });

    document.querySelector('.js-example1').addEventListener('click', event => {
        document.querySelector('#paramA').value = 0;
        document.querySelector('#paramB').value = 15;
        document.querySelector('#paramN').value = 6;
        document.querySelector('#paramL').value = 5;
        document.querySelector('#paramS').value = 2;
        document.querySelector('#paramK').value = 1;
        document.querySelector('#paramH').value = 1;

        document.querySelector('#selectParamSConst').click();
        document.querySelector('#selectParamTa').click();
        document.querySelector('#selectParamTb').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));
    });

    document.querySelector('.js-example2').addEventListener('click', event => {
        document.querySelector('#paramA').value = 0;
        document.querySelector('#paramB').value = 0;
        document.querySelector('#paramN').value = 6;
        document.querySelector('#paramL').value = 5;
        document.querySelector('#paramS').value = 2;
        document.querySelector('#paramK').value = 1;
        document.querySelector('#paramH').value = 1;

        document.querySelector('#selectParamSConst').click();
        document.querySelector('#selectParamTa').click();
        document.querySelector('#selectParamQb').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));

    });

    document.querySelector('.js-example3').addEventListener('click', event => {
        document.querySelector('#paramA').value = 0;
        document.querySelector('#paramB').value = 10;
        document.querySelector('#paramN').value = 5;
        document.querySelector('#paramL').value = 4;
        document.querySelector('#paramS').value = 15;
        document.querySelector('#paramK').value = 5;
        document.querySelector('#paramH').value = 5;

        document.querySelector('#selectParamSConst').click();
        document.querySelector('#selectParamTa').click();
        document.querySelector('#selectParamTinfB').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));

    });

    document.querySelector('.js-example4').addEventListener('click', event => {
        document.querySelector('#paramA').value = 10;
        document.querySelector('#paramB').value = 0;
        document.querySelector('#paramN').value = 5;
        document.querySelector('#paramL').value = 4;
        document.querySelector('#paramS').value = 15;
        document.querySelector('#paramK').value = 5;
        document.querySelector('#paramH').value = 5;

        document.querySelector('#selectParamSConst').click();
        document.querySelector('#selectParamTb').click();
        document.querySelector('#selectParamTinfA').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));

    });

    document.querySelector('.js-example5').addEventListener('click', event => {
        document.querySelector('#paramA').value = -10;
        document.querySelector('#paramB').value = 25;
        document.querySelector('#paramN').value = 6;
        document.querySelector('#paramL').value = 5;
        document.querySelector('#paramS').value = 2;
        document.querySelector('#paramK').value = 1;
        document.querySelector('#paramH').value = 5;

        document.querySelector('#selectParamSConst').click();
        document.querySelector('#selectParamQa').click();
        document.querySelector('#selectParamTb').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));

    });

    document.querySelector('.js-example6').addEventListener('click', event => {
        document.querySelector('#paramA').value = 150;
        document.querySelector('#paramB').value = 200;
        document.querySelector('#paramL').value = 1;
        document.querySelector('#paramSc').value = 2000;
        document.querySelector('#paramSp').value = -100;
        document.querySelector('#paramK').value = 120;
        document.querySelector('#paramN').value = 3;

        document.querySelector('#selectParamSFunc').click();
        document.querySelectorAll('input').forEach(elem => elem.classList.remove('error-input'));

    });

    document.querySelectorAll('.js-paramSelectorA li a').forEach(elem => elem.addEventListener('click', event => {
        document.querySelectorAll('.js-paramSelectorA li a').forEach(elem => elem.classList.remove('active'));
        elem.classList.add('active');
        document.querySelector('#js-paramSelectorAValue').innerHTML = elem.innerHTML;
        if (elem.id === 'selectParamTinfA') {
            document.querySelector('.js-paramTinfActive').classList.remove('d-none');
            document.querySelector('#selectParamTinfB').classList.add('d-none');
        } else {
            document.querySelector('.js-paramTinfActive').classList.add('d-none');
            document.querySelector('#selectParamTinfB').classList.remove('d-none');
        }
    }));

    document.querySelectorAll('.js-paramSelectorB li a').forEach(elem => elem.addEventListener('click', event => {
        document.querySelectorAll('.js-paramSelectorB li a').forEach(elem => elem.classList.remove('active'));
        elem.classList.add('active');
        document.querySelector('#js-paramSelectorBValue').innerHTML = elem.innerHTML;
        if (elem.id === 'selectParamTinfB') {
            document.querySelector('.js-paramTinfActive').classList.remove('d-none');
            document.querySelector('#selectParamTinfA').classList.add('d-none');
        } else {
            document.querySelector('.js-paramTinfActive').classList.add('d-none');
            document.querySelector('#selectParamTinfA').classList.remove('d-none');
        }
    }));

    document.querySelectorAll('.js-paramSelectorS li a').forEach(elem => elem.addEventListener('click', event => {
        document.querySelectorAll('.js-paramSelectorS li a').forEach(elem => elem.classList.remove('active'));
        elem.classList.add('active');
        document.querySelector('#js-paramSelectorS').innerHTML = elem.innerHTML;
        if (elem.id === 'selectParamSFunc') {
            document.querySelector('.paramSc').classList.remove('d-none');
            document.querySelector('.paramSp').classList.remove('d-none');

            document.querySelector('.paramS').classList.add('d-none');
            // document.querySelector('.paramN').classList.add('d-none');

            document.querySelector('#selectParamTa').click();
            document.querySelector('#selectParamTb').click();
            document.querySelector('#selectParamQa').classList.add('d-none');
            document.querySelector('#selectParamQb').classList.add('d-none');
            document.querySelector('#selectParamTinfA').classList.add('d-none');
            document.querySelector('#selectParamTinfB').classList.add('d-none');

        } else {
            document.querySelector('.paramS').classList.remove('d-none');
            // document.querySelector('.paramN').classList.remove('d-none');

            document.querySelector('#selectParamQa').classList.remove('d-none');
            document.querySelector('#selectParamQb').classList.remove('d-none');
            document.querySelector('#selectParamTinfA').classList.remove('d-none');
            document.querySelector('#selectParamTinfB').classList.remove('d-none');

            document.querySelector('.paramSc').classList.add('d-none');
            document.querySelector('.paramSp').classList.add('d-none');
        }
    }));

    document.querySelectorAll('input').forEach(elem => elem.addEventListener('input', event => {
        elem.classList.remove('error-input');
    }))

};

class PQMethod {
    a; b; c; d;
    P; Q;
    N; k; S; L; dx;
    T;
    Ta; Tb;
    qa; qb;
    h; TinfA; TinfB;
    Sc; Sp;
    constructor(N, k, S, L) {
        this.a = new Array(N);
        this.b = new Array(N);
        this.c = new Array(N);
        this.d = new Array(N);

        for (let i = 0; i < N; i++) {
            this.a[i] = 0;
            this.b[i] = 0;
            this.c[i] = 0;
            this.d[i] = 0;
        }

        this.P = new Array(N);
        this.Q = new Array(N);

        this.N = N;
        this.k = k;
        this.S = S;
        this.L = L;
        this.dx = L / (N - 1);

        this.T = new Array(N);
    }

    SetOdds() {
        if (!(this.Ta === undefined)) {
            this.a[0] = 1;
            this.d[0] = this.Ta;
        } else {
            if (!((this.h === undefined) && (this.TinfA === undefined))) {
                this.a[0] = this.k + this.h;
                this.b[0] = this.k;
                this.d[0] = this.h * this.TinfA + (this.S * this.dx) / 2;
            } else {
                if (!(this.qa === undefined)) {
                    this.a[0] = this.k;
                    this.b[0] = this.k;
                    this.d[0] = this.qa * this.dx + this.S * Math.pow(this.dx, 2) / 2;
                }
            }
        }

        if (!(this.Tb === undefined)) {
            this.a[this.N-1] = 1;
            this.d[this.N-1] = this.Tb;
        } else {
            if (!((this.h === undefined) && (this.TinfB === undefined))) {
                this.a[this.N-1] = this.k + this.h;
                this.c[this.N-1] = this.k;
                this.d[this.N-1] = (this.S * this.dx) / 2 + this.h * this.TinfB;
            } else {
                if (!(this.qb === undefined)) {
                    this.a[this.N-1] = this.k;
                    this.c[this.N-1] = this.k;
                    this.d[this.N-1] = this.S * Math.pow(this.dx, 2) / 2 - this.qb * this.dx;
                }
            }
        }

        for (let i = 1; i < this.N - 1; i++) {
            if ((this.Sc === undefined) && (this.Sp === undefined)) {
                this.a[i] = (2 * this.k) / this.dx;
                this.b[i] = this.k / this.dx;
                this.c[i] = this.k / this.dx;
                this.d[i] = this.S * this.dx;
            } else {
                this.a[i] = this.k / this.dx + this.k / this.dx - this.Sp * this.dx;
                this.b[i] = this.k / this.dx;
                this.c[i] = this.k / this.dx;
                this.d[i] = this.Sc * this.dx;
            }
        }

    }

    Solved() {
        this.SetOdds();

        this.P[0] = (this.b[0] / this.a[0]);
        this.Q[0] = (this.d[0] / this.a[0]);
        for (let i = 1; i < this.N; i++) {
            this.P[i] = (this.b[i] / (this.a[i] - this.c[i] * this.P[i-1]));
            this.Q[i] = ((this.c[i] * this.Q[i-1] + this.d[i]) / (this.a[i] - this.c[i] * this.P[i-1]));
        }

        this.T[this.N-1] = round2(this.Q[this.N-1]);
        for (let i = this.N - 1; i > 0; i--) {
            this.T[i-1] = round2(this.P[i-1] * this.T[i] + this.Q[i-1]);
        }
    }
}

function round(numb) {
    const decimals = 1;
    return Number(Math.round(numb+'e'+decimals)+'e-'+decimals);
}

function round2(numb) {
    const decimals = 3;
    return Number(Math.round(numb+'e'+decimals)+'e-'+decimals);
}