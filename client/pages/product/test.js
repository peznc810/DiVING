  const [data, setData] = useState(Lesson)
  const [search, setSearch] = useState('')
  
  const handleSearch = () => {
    console.log('按鈕被點擊了')
    let newData
    if (search.trim() === '') {
        newData = Lesson;
        console.log(newData)
    
    } else {
      newData = Lesson.filter((v, i) => {
        return v.name.includes(search)
      })
    }
    setData(newData)
  }
      useEffect(() => {
        getLesson()
      }, [])