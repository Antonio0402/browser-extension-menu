<?php

namespace App\Controller;

use App\Repository\ExtensionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    #[Route('/', name: 'app_homepage')]
    public function homepage(ExtensionRepository $repository): Response
    {
        $extensions = $repository->findAll();

        return $this->render('main/homepage.html.twig', [
            'extensions' => $extensions,
        ]);
    }

    /**
     * @Route("/active", name="app_filter_active")
     */
    #[Route('/active', name: 'app_filter_active', methods: ['GET'])]
    public function filterActive(ExtensionRepository $repository): Response
    {
        $extensions = $repository->findActive();

        return $this->render('main/filter_active.html.twig', [
            'extensions' => $extensions,
        ]);
    }

    /**
     * @Route("/inactive", name="app_filter_inactive")
     */
    #[Route('/inactive', name: 'app_filter_inactive', methods: ['GET'])]
    public function filterInactive(ExtensionRepository $repository): Response
    {
        $extensions = $repository->findInactive();

        return $this->render('main/filter_inactive.html.twig', [
            'extensions' => $extensions,
        ]);
    }

}
