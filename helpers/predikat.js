function getPredikat(score) {
    let result = ''
    if (score >= 90 && score <= 100) {
        result = 'A'
    } else if (score >= 80 && score <= 89) {
        result = 'B'
    } else if (score >= 70 && score <= 79) {
        result = 'C'
    } else if (score >= 60 && score <= 69) {
        result = 'D'
    } else if (score >= 50 && score <= 59) {
        result = 'E'
    } else {
        result = 'F'
    }
    return result
}
module.exports = getPredikat