// DOM 요소 참조
const elements = {
    // 입력 필드
    pCr: document.getElementById('pCr'),
    uCr: document.getElementById('uCr'),
    pNa: document.getElementById('pNa'),
    uNa: document.getElementById('uNa'),
    pUrea: document.getElementById('pUrea'),
    uUrea: document.getElementById('uUrea'),

    // 버튼
    calculateBtn: document.getElementById('calculateBtn'),
    resetBtn: document.getElementById('resetBtn'),

    // 결과 섹션
    resultSection: document.getElementById('resultSection'),

    // FENa 결과
    fenaResult: document.getElementById('fenaResult'),
    fenaValue: document.getElementById('fenaValue'),
    fenaInterpretation: document.getElementById('fenaInterpretation'),

    // FEUrea 결과
    feureaResult: document.getElementById('feureaResult'),
    feureaValue: document.getElementById('feureaValue'),
    feureaInterpretation: document.getElementById('feureaInterpretation')
};

/**
 * FENa 계산
 * FENa (%) = (UNa × PCr) / (PNa × UCr) × 100
 * @param {number} uNa - 소변 나트륨 (mmol/L)
 * @param {number} pNa - 혈청 나트륨 (mg/dL)
 * @param {number} uCr - 소변 크레아티닌 (mg/dL)
 * @param {number} pCr - 혈청 크레아티닌 (mg/dL)
 * @returns {number|null} FENa 값 (%) 또는 null (계산 불가시)
 */
function calculateFENa(uNa, pNa, uCr, pCr) {
    // 필수값 확인
    if (!uNa || !pNa || !uCr || !pCr) {
        return null;
    }

    // 0으로 나누기 방지
    if (pNa === 0 || uCr === 0) {
        return null;
    }

    const fena = (uNa * pCr) / (pNa * uCr) * 100;
    return fena;
}

/**
 * FEUrea 계산
 * FEUrea (%) = (UUrea × PCr) / (PUrea × UCr) × 100
 * @param {number} uUrea - 소변 요소 (mg/dL)
 * @param {number} pUrea - 혈청 BUN (mg/dL)
 * @param {number} uCr - 소변 크레아티닌 (mg/dL)
 * @param {number} pCr - 혈청 크레아티닌 (mg/dL)
 * @returns {number|null} FEUrea 값 (%) 또는 null (계산 불가시)
 */
function calculateFEUrea(uUrea, pUrea, uCr, pCr) {
    // 필수값 확인
    if (!uUrea || !pUrea || !uCr || !pCr) {
        return null;
    }

    // 0으로 나누기 방지
    if (pUrea === 0 || uCr === 0) {
        return null;
    }

    const feurea = (uUrea * pCr) / (pUrea * uCr) * 100;
    return feurea;
}

/**
 * FENa 결과 해석
 * @param {number|null} fena - FENa 값 (%)
 * @returns {Object} 해석 결과 {text, className}
 */
function interpretFENa(fena) {
    if (fena === null) {
        return {
            text: '계산에 필요한 값이 부족합니다 (PCr, UCr, PNa, UNa)',
            className: 'insufficient'
        };
    }

    if (fena < 1) {
        return {
            text: '신전성 급성신손상 (Prerenal AKI) 시사',
            className: 'prerenal'
        };
    } else if (fena <= 2) {
        return {
            text: '경계값 - 추가 평가 필요',
            className: 'borderline'
        };
    } else {
        return {
            text: '신실질성 급성신손상 (Intrinsic AKI) 시사',
            className: 'intrinsic'
        };
    }
}

/**
 * FEUrea 결과 해석
 * @param {number|null} feurea - FEUrea 값 (%)
 * @returns {Object} 해석 결과 {text, className}
 */
function interpretFEUrea(feurea) {
    if (feurea === null) {
        return {
            text: '계산에 필요한 값이 부족합니다 (PCr, UCr, PUrea, UUrea)',
            className: 'insufficient'
        };
    }

    if (feurea < 35) {
        return {
            text: '신전성 급성신손상 (Prerenal AKI) 시사',
            className: 'prerenal'
        };
    } else {
        return {
            text: '신실질성 급성신손상 (Intrinsic AKI) 시사',
            className: 'intrinsic'
        };
    }
}

/**
 * 입력값 가져오기
 * @param {HTMLInputElement} input - 입력 요소
 * @returns {number|null} 숫자 값 또는 null
 */
function getInputValue(input) {
    const value = parseFloat(input.value);
    return isNaN(value) || value < 0 ? null : value;
}

/**
 * 결과 표시
 */
function displayResults() {
    // 입력값 가져오기
    const pCr = getInputValue(elements.pCr);
    const uCr = getInputValue(elements.uCr);
    const pNa = getInputValue(elements.pNa);
    const uNa = getInputValue(elements.uNa);
    const pUrea = getInputValue(elements.pUrea);
    const uUrea = getInputValue(elements.uUrea);

    // FENa 계산 및 표시
    const fena = calculateFENa(uNa, pNa, uCr, pCr);
    const fenaInterpretation = interpretFENa(fena);

    elements.fenaValue.textContent = fena !== null ? fena.toFixed(2) + '%' : '--%';
    elements.fenaInterpretation.querySelector('.interpretation-text').textContent = fenaInterpretation.text;

    // FENa 결과 카드 클래스 업데이트
    elements.fenaResult.className = 'result-card ' + fenaInterpretation.className;

    // FEUrea 계산 및 표시
    const feurea = calculateFEUrea(uUrea, pUrea, uCr, pCr);
    const feureaInterpretation = interpretFEUrea(feurea);

    elements.feureaValue.textContent = feurea !== null ? feurea.toFixed(2) + '%' : '--%';
    elements.feureaInterpretation.querySelector('.interpretation-text').textContent = feureaInterpretation.text;

    // FEUrea 결과 카드 클래스 업데이트
    elements.feureaResult.className = 'result-card ' + feureaInterpretation.className;

    // 결과 섹션 표시
    elements.resultSection.classList.remove('hidden');

    // 결과 섹션으로 스크롤
    elements.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * 입력값 초기화
 */
function resetInputs() {
    // 모든 입력 필드 초기화
    elements.pCr.value = '';
    elements.uCr.value = '';
    elements.pNa.value = '';
    elements.uNa.value = '';
    elements.pUrea.value = '';
    elements.uUrea.value = '';

    // 결과 섹션 숨기기
    elements.resultSection.classList.add('hidden');

    // 첫 번째 입력 필드에 포커스
    elements.pCr.focus();
}

/**
 * 이벤트 리스너 등록
 */
function initEventListeners() {
    // 계산 버튼 클릭
    elements.calculateBtn.addEventListener('click', displayResults);

    // 초기화 버튼 클릭
    elements.resetBtn.addEventListener('click', resetInputs);

    // Enter 키로 계산 실행
    const inputs = [elements.pCr, elements.uCr, elements.pNa, elements.uNa, elements.pUrea, elements.uUrea];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                displayResults();
            }
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initEventListeners);
