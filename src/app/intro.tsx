import { Code, Github, Linkedin, Mail, MapPin, Music } from "lucide-react"


export const Introduction = () => {
    return (
        <div className="container mx-auto py-12">
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {`Hi, I'm Vincent 👋`}
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Code className="w-4 h-4" />
                  <span>Software Engineer</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Chicago, IL</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Music className="w-4 h-4" />
                  <span>Piano Enthusiast</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {`This collection of piano sheet music include my own arrangements to songs I've found
                interesting throughout the past years. I'll continue to add more in the future.`}
              </p>

              <div className="h-px bg-blue-100 my-6" />

              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:vincentxu9@gmail.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Gmail</span>
                </a>
                <a
                  href="https://github.com/vincentxu123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vincent-xu-ab1169140/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
    )
}