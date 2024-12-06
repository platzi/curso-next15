import { Heading, Text } from "@chakra-ui/react"

import { orm } from "../db"
import { Bookmark } from "./components/Bookmark"

export default async function Bookmarks() {
  const bookmarks = await orm.query.bookmarks.findMany({
    limit: 10,
    with: {
      author: true,
    },
  })

  return (
    <main className="container mx-auto px-4 my-16 space-y-4">
      <header>
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul>
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6" key={bookmark.id}>
            <Bookmark {...bookmark} />
            <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
