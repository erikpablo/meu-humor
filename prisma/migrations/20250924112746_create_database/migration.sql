-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mood_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "mood_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MoodEntry" (
    "id" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "mood_type_id" TEXT NOT NULL,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mood_types_name_key" ON "public"."mood_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mood_types_weight_key" ON "public"."mood_types"("weight");

-- AddForeignKey
ALTER TABLE "public"."MoodEntry" ADD CONSTRAINT "MoodEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MoodEntry" ADD CONSTRAINT "MoodEntry_mood_type_id_fkey" FOREIGN KEY ("mood_type_id") REFERENCES "public"."mood_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
