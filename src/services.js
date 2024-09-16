export async function getQuestionsData() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    const data = await res.json()
    return data.results
}
