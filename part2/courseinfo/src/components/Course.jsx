const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => {
    return(
        <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <Sum parts={parts} />
        </>
    )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>
    
const Sum = ({parts}) => {
    const total = parts.reduce(
        (s, p) => s + p.exercises,
        0,
    )
    return <b><p>total of {total} exercises</p></b>
}

const Course = ({course}) => {
    return(
        <>
        <Header courseName={course.name} /> 
        <Content parts={course.parts} />
        </>
    )
}

export default Course
